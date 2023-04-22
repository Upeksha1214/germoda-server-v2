import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type InquiryDocument = HydratedDocument<Inquiry>;

@Schema({ collection: 'germoda-inquiries' })
class Inquiry {

  @Prop({required:true})
  inquiryId:string;

  @Prop({required:true})
  inquiry:string;

  @Prop({ required: true })
  studentId: string;

  @Prop({ required:true})
  description: string;

  @Prop({ required: true })
  email: string;
}

export const InquirySchema = SchemaFactory.createForClass(Inquiry);

export const InquiryMongooseModule = MongooseModule.forFeature([
  { name: Inquiry.name, schema: InquirySchema },
]);