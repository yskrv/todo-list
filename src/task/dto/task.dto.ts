import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  priority: number;

  @IsNotEmpty()
  @IsBoolean()
  isDone: boolean;
}
