import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModel } from './entities/task.model';
import { LoggerModule } from '../utils/logger/logger.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports:[
    TypeOrmModule.forFeature([TasksModel]),
    LoggerModule
  ],
  exports:[
    TasksService,
    // ProjectRepository,
  ]
})
export class TasksModule {}
