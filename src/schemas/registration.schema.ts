import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Collection, Date, HydratedDocument } from 'mongoose';

export type RegistrationDocument = HydratedDocument<Registration>;

@Schema({ collection: 'germoda-registration' })
class Registration {
  
  @Prop({required:true})
  registerId:string;

  @Prop({ require: true })
  studentId: string;

  @Prop({ require: true })
  amount: number;

  @Prop({ require: true })
  balance: number;

  @Prop({ require: true })
  paymentDate: Date;

  @Prop({ required:true})
  payemetTime:string
}

export const RegistrationSchema = SchemaFactory.createForClass(Registration);

export const RegistrationMongooseModule = MongooseModule.forFeature([
  { name: Registration.name, schema: RegistrationSchema }
])