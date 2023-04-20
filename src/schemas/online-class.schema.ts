import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import IOnlineClass from 'src/interfaces/online-class.interface';

export type OnlineClassDocument = HydratedDocument<OnlineClass>;

@Schema({ collection: 'germoda-online-classes' })
export class OnlineClass implements IOnlineClass {
  @Prop({ type: Date, required: true })
  date: mongoose.Date;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  className: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  fee: number;

  @Prop({ required: true })
  meetingUrlId: string;

  @Prop({ required: true })
  meetingTitle: string;

}

export const OnlineClassSchema = SchemaFactory.createForClass(OnlineClass);

export const OnlineClassMongooseModule = MongooseModule.forFeature([
  { name: OnlineClass.name, schema: OnlineClassSchema },
]);
