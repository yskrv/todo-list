import {
  Body,
  Controller,
  Get,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';
import { Task } from './schemas/task.schema';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll(): Promise<Task[]> {
    return await this.taskService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Task> {
    return await this.taskService.getById(id);
  }

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() taskDto: TaskDto): Promise<Task> {
    return this.taskService.create(taskDto);
  }

  @Patch('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() taskDto: TaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, taskDto);
  }

  @Patch('/toggle/:id')
  async toggle(@Param('id') id: string): Promise<Task> {
    return this.taskService.updateIsDone(id);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<Task> {
    return this.taskService.delete(id);
  }
}
