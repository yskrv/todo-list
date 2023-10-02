import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { TaskController } from '../../src/task/task.controller';
import { TaskService } from '../../src/task/task.service';
import { Task, TaskSchema } from '../../src/task/schemas/task.schema';
import { TaskDto } from '../../src/task/dto/task.dto';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

const fakeDbConfig = {
  uri: process.env.TEST_DB_URL
}

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        imports: [
            MongooseModule.forRoot('mongodb://localhost:27017/todo-test'), 
            MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
          ],
      controllers: [TaskController],
      providers: [TaskService],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of tasks', async () => {
      const tasks: Task[] = [{
        name: 'Test Task',
        priority: 1,
        isDone: true, 
      }];
      jest.spyOn(taskService, 'getAll').mockResolvedValue(tasks);

      expect(await taskController.getAll()).toBe(tasks);
    });
  });

  describe('getById', () => {
    it('should return a single task by ID', async () => {
      const taskId = new Types.ObjectId();
      const task: Task = {
        name: 'Test Task',
        priority: 1,
        isDone: true, 
      };
      jest.spyOn(taskService, 'getById').mockResolvedValue(task);

      expect(await taskController.getById(taskId.toString())).toBe(task);
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const taskDto: TaskDto = {
        name: 'Test Task',
        priority: 1,
        isDone: false,
      };
      const createdTask: Task = {
        name: 'Test Task',
        priority: 1,
        isDone: false,
      };
      jest.spyOn(taskService, 'create').mockResolvedValue(createdTask);

      expect(await taskController.create(taskDto)).toBe(createdTask);
    });
  });

  describe('update', () => {
    it('should update an existing task by ID', async () => {
      const taskId = new Types.ObjectId();
      const taskDto: TaskDto = {
        name: 'Updated Task',
        priority: 2,
        isDone: true,
      };
      const updatedTask: Task = {
        name: 'Updated Task',
        priority: 2,
        isDone: true,
      };
      jest.spyOn(taskService, 'update').mockResolvedValue(updatedTask);

      expect(await taskController.update(taskId.toString(), taskDto)).toBe(updatedTask);
    });
  });

  describe('toggle', () => {
    it('should toggle the "isDone" property of an existing task by ID', async () => {
      const taskId = new Types.ObjectId();
      const toggledTask: Task = {
        name: 'Test Task',
        priority: 1,
        isDone: true,
      };
      jest.spyOn(taskService, 'updateIsDone').mockResolvedValue(toggledTask);

      expect(await taskController.toggle(taskId.toString())).toBe(toggledTask);
    });
  });

  describe('delete', () => {
    it('should delete an existing task by ID', async () => {
      const taskId = new Types.ObjectId();
      const deletedTask: Task = {
        name: 'Deleted Task',
        priority: 3,
        isDone: false,
      };
      jest.spyOn(taskService, 'delete').mockResolvedValue(deletedTask);

      expect(await taskController.delete(taskId.toString())).toBe(deletedTask);
    });
  });
});
