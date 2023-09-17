import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  priority: number;

  @Prop({ required: true })
  isDone: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
