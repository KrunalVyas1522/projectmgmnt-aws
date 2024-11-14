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
    LoggerModule,
    TypeOrmModule.forFeature([ProjectsModel]),
    
    ],
  providers: [
    ProjectsService,
    ProjectRepository,
    AwsService,
    LoggerService,
    
  ],
  controllers: [ProjectsController],

  exports:[
    ProjectRepository,
    ProjectsService,
  ]
})
export class ProjectsModule {}
