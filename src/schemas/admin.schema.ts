import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import IAdmin from 'src/interfaces/admin.interface';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ collection: 'germoda-admin' })
export class Admin implements IAdmin {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

export const AdminMongooseModule = MongooseModule.forFeature([
  { name: Admin.name, schema: AdminSchema },
]);
