import { TaskDto } from '../../src/task/dto/task.dto';
import { validate } from 'class-validator';

describe('TaskDto', () => {
  let taskDto: TaskDto;

  beforeEach(() => {
    taskDto = new TaskDto();
  });

  it('should be defined', () => {
    expect(taskDto).toBeDefined();
  });

  describe('name', () => {
    it('should have a name property', () => {
      taskDto.name = 'Test Task';
      expect(taskDto.name).toBe('Test Task');
    });
  
    it('should not allow empty name', async () => {
      taskDto.name = '';
      const errors = await validate(taskDto);
      expect(errors).toBeDefined();
      expect(errors.length).toBeGreaterThan(0);
    });
  
    it('should not allow non-string name', async () => {
      taskDto.name = 123 as any;
      const errors = await validate(taskDto);
      expect(errors).toBeDefined();
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('priority', () => {
    it('should have a priority property', () => {
      taskDto.priority = 1;
      expect(taskDto.priority).toBe(1);
    });
    
    it('should not allow empty priority', async () => {
      taskDto.priority = null as any;
      const errors = await validate(taskDto);
      expect(errors).toBeDefined();
      expect(errors.length).toBeGreaterThan(0);
    });
  
    it('should not allow non-numeric priority', async () => {
      taskDto.priority = '1' as any;
      const errors = await validate(taskDto);
      expect(errors).toBeDefined();
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('isDone', () => {
    it('should have an isDone property', () => {
      taskDto.isDone = false;
      expect(taskDto.isDone).toBe(false);
    });

    it('should not allow empty isDone', async () => {
      taskDto.isDone = undefined as any;
      const errors = await validate(taskDto);
      expect(errors).toBeDefined();
      expect(errors.length).toBeGreaterThan(0);
    });
  
    it('should not allow non-boolean isDone', async () => {
      taskDto.isDone = 'false' as any;
      const errors = await validate(taskDto);
      expect(errors).toBeDefined();
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
