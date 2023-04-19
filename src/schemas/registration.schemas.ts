import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import IRegistration from '../interfaces/registration.interface';

export type RegistrationDocument = HydratedDocument<Registration>;

@Schema({ collection: 'germoda-registration' })
export class Registration implements IRegistration {
  @Prop({ required: true })
  registerId: string;

  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  registerDate: Date;

  @Prop({ required: true })
  registerTime: string;
}

export const RegistrationSchema = SchemaFactory.createForClass(Registration);

export const RegistrationMongooseModule = MongooseModule.forFeature([
  { schema: RegistrationSchema, name: Registration.name },
]);
