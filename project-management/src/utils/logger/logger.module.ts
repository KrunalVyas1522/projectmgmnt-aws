import { Module } from '@nestjs/common';
import { LoggerService } from './winstonLogger';
import { Logger } from 'winston';

@Module({
  imports: [Logger],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
