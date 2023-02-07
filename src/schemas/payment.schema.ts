import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';
import IPayment from 'src/interfaces/payment.interface';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ collection: 'germoda-payments' })
export class Payment implements IPayment {
  @Prop()
  studentId: string;

  @Prop()
  amount: number;

  @Prop()
  balance: number;

  @Prop({ type: Date })
  paymentDateTime: Date;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);

export const PaymentMongooseModule = MongooseModule.forFeature([
  { schema: PaymentSchema, name: Payment.name },
]);
