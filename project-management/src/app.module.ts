import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './utils/logger/logger.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    SwaggerModule,
    ProjectsModule,
    TasksModule,
    UsersModule
  ],
})
export class AppModule {}
