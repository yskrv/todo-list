import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { TaskService } from '../src/task/task.service';
import { Task, TaskDocument, TaskSchema } from '../src/task/schemas/task.schema';
import { TaskDto } from '../src/task/dto/task.dto';
import 'dotenv/config';

describe('TaskService', () => {
  let taskService: TaskService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/todo-test'), 
        MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
      ],
      providers: [TaskService],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
  });

  afterAll(async () => {
    await module.close();
  });


  describe('getAll', () => {
    it('should return an array of tasks', async () => {
      const mockTasks: TaskDocument[] = [{}] as TaskDocument[]; 
      jest.spyOn(taskService, 'getAll').mockResolvedValue(mockTasks);

      const result = await taskService.getAll();

      expect(result).toEqual(mockTasks);
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('getById', () => {
    it('should return a task by ID', async () => {
      const mockTask: TaskDocument = {} as TaskDocument;
      const taskId = new Types.ObjectId();
      jest.spyOn(taskService, 'getById').mockResolvedValue(mockTask);

      const result = await taskService.getById(taskId.toString());

      expect(result).toEqual(mockTask);
    });
  });

  describe('create', () => {
    it('should create and return a new task', async () => {
      const taskDto: TaskDto = {
        name: 'Test Task',
        priority: 1,
        isDone: false,
      };
      const mockCreatedTask = { ...taskDto, _id: new Types.ObjectId() };
      jest.spyOn(taskService, 'create').mockResolvedValue(mockCreatedTask);

      const result = await taskService.create(taskDto);

      expect(result).toEqual(mockCreatedTask);
      expect(typeof result.name).toBe('string');
      expect(typeof result.priority).toBe('number');
      expect(typeof result.isDone).toBe('boolean');
    });
  });

  describe('update', () => {
    it('should update and return a task', async () => {
      const taskId = new Types.ObjectId();
      const taskDto: TaskDto = {
        name: 'Updated Task',
        priority: 2,
        isDone: true,
      };
      const mockUpdatedTask = { ...taskDto, _id: taskId };
      jest.spyOn(taskService, 'update').mockResolvedValue(mockUpdatedTask);

      const result = await taskService.update(taskId.toString(), taskDto);

      expect(result).toEqual(mockUpdatedTask);
    });
  });

  describe('updateIsDone', () => {
    it('should toggle the isDone property of a task', async () => {
      const taskId = new Types.ObjectId();
      const mockTaskFalse = { 
        _id: taskId, 
        name: 'Test Task',
        priority: 1,
        isDone: false
      };

      const mockTaskTrue = { 
        _id: taskId, 
        name: 'Test Task',
        priority: 1,
        isDone: true
      };

      jest.spyOn(taskService, 'getById').mockResolvedValue(mockTaskFalse);
      jest.spyOn(taskService, 'updateIsDone').mockResolvedValue(mockTaskTrue);

      const result = await taskService.updateIsDone(taskId.toString());

      expect(result).toEqual(mockTaskTrue);
    });
  });

  describe('delete', () => {
    it('should delete a task by ID', async () => {
      const taskId = new Types.ObjectId();
      jest.spyOn(taskService, 'delete').mockResolvedValue(undefined);

      const result = await taskService.delete(taskId.toString());

      expect(result).toBeUndefined();
    });
  });
});