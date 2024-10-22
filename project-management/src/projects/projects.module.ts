import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectRepository } from './repository/projects.repository';
import { LoggerService } from 'src/utils/logger/winstonLogger';
import { ProjectsModel } from './entities/project.model';

@Module({
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    ProjectRepository,
    LoggerService
  ],
  imports:[
    TypeOrmModule.forFeature([ProjectsModel]),
    // LoggerModule
  ],
  exports:[
    ProjectsService,
    ProjectRepository,
  ]
})
export class ProjectsModule {}
