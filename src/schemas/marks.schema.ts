import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MarksDocument = HydratedDocument<Marks>;

@Schema()
class Marks {
  @Prop()
  examId: string;

  @Prop()
  className: string;

  @Prop()
  grade: string;

  @Prop()
  marks: number;

  @Prop()
  studentId: string;

  @Prop()
  status: string;
}

export const MarksSchema = SchemaFactory.createForClass(Marks);
