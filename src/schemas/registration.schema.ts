import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type RegistrationDocument = HydratedDocument<Registration>;

@Schema()
class Registration {
  @Prop()
  studentId: string;

  @Prop()
  amount: number;

  @Prop()
  balance: number;

  @Prop()
  paymentDateTime: Date;
}

export const RegistrationSchema = SchemaFactory.createForClass(Registration);
