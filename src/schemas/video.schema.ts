import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import IVideo from '../interfaces/video.interface';

export type VideoDocument = HydratedDocument<Video>;
@Schema({ collection: 'germoda-video' })
export class Video implements IVideo {
  @Prop({ required: true })
  videoNum: string;

  @Prop({ required: true })
  videoName: string;

  @Prop({ required: true })
  videoSize: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

export const VideoMongooseModule = MongooseModule.forFeature([
  { name: Video.name, schema: VideoSchema },
]);
