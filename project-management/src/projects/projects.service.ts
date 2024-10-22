import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsModel } from './entities/project.model';
import { LoggerService } from '../utils/logger/WinstonLogger';
import { ProjectsBuilder } from './builders/projects.builder';
import { IProjectRepository, ProjectRepository } from './repository/projects.repository';
import { AwsService } from '../utils/aws/aws.service';

@Injectable()
export class ProjectsService {

  constructor(
    // private readonly logger: LoggerService,

    @Inject(ProjectRepository)
    public projectsRepository: IProjectRepository,

    @Inject()
    public awsService: AwsService,

  ){};
  

  static logInfo = 'Service - Projects:';

  async create(data: CreateProjectDto): Promise<ProjectsModel | Error> {
    // this.logger.info(
    //   `${ ProjectsService.logInfo} Create project with name : ${data.title}`,
    // );
    try {
      const phaseData = await ProjectsBuilder.buildProject(data); 
      await this.awsService.sendSnsMessage('<sns-topic-arn>', `Project created: ${data.title}`);

      const record = await this.projectsRepository.saveProject(phaseData);

      await this.awsService.invokeLambda('<lambda-function-name>', { projectId: record.id });

      await this.awsService.sendSqsMessage('sqs-queue-url', JSON.stringify(record));


      // this.logger.info(
      //   `${ ProjectsService.logInfo} Created project with following Data: ${data}`,
      // );
      // this.logger.debug(
      //   `${ ProjectsService.logInfo} Created project with following Data: ${data}`,
      // );
      return record;
    } catch (error) {
      // this.logger.error(
      //   `${ ProjectsService.logInfo} Error Occurred Due to: ${error}`, error
      // );
    }
  }

  public async findAll() {
    try {
      const projects = await this.projectsRepository.getAllProjects('');
      if (!projects.length) {
        // this.logger.info(`${ProjectsService.logInfo} failed to find Projects for data: ${'query'}`);
        throw new NotFoundException(`No projects found for query: ${'query'}`);
      }
      // this.logger.info(`${ProjectsService.logInfo} Found Projects with data: ${'query'}`);
      return projects;
    } catch (error) {
      // this.logger.info(`${ProjectsService.logInfo} failed to find projects for data: ${'query'}`);
      return error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
