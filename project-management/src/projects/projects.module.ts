import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from './repository/projects.repository';
import { LoggerService } from '../utils/logger/winstonLogger';
import { ProjectsModel } from './entities/project.model';
import { AwsService } from '../utils/aws/aws.service';
import { LoggerModule } from '../utils/logger/logger.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProjectsModel]),
    ],
  providers: [
    LoggerService,
    ProjectsService,
    ProjectRepository,
    AwsService,
    
  ],
  controllers: [ProjectsController],

  exports:[
    ProjectsService,
    ProjectRepository,
  ]
})
export class ProjectsModule {}
