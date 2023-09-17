import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModule } from './task/task.module';
import 'dotenv/config';

@Module({
  imports: [
    TaskModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/todo')
  ],
})
export class AppModule {}
