import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async getAll(): Promise<Task[]> {
    const tasks: TaskDocument[] = await this.taskModel
      .find()
      .sort({ priority: 1 })
      .exec();
    return tasks;
  }

  async getById(id: string): Promise<Task> {
    const task: TaskDocument = await this.taskModel.findById(id);
    return task;
  }

  async create(taskDto: TaskDto): Promise<Task> {
    const task: TaskDocument = new this.taskModel(taskDto);
    return task.save();
  }

  async update(id: string, taskDto: TaskDto): Promise<Task> {
    const updatedTask: TaskDocument = await this.taskModel.findByIdAndUpdate(
      id,
      taskDto,
      { new: true },
    );
    return updatedTask;
  }

  async updateIsDone(id: string): Promise<Task> {
    const task: TaskDocument = await this.taskModel.findById(id);
    const updatedTask: TaskDocument = await this.taskModel.findByIdAndUpdate(
      id,
      { isDone: !task.isDone },
      { new: true },
    );
    return updatedTask;
  }

  async delete(id: string): Promise<Task> {
    return await this.taskModel.findByIdAndDelete(id);
  }
}
