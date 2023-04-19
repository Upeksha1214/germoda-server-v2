import { PartialType } from '@nestjs/mapped-types';
import IVideo from '../../../interfaces/video.interface';
import { CreateVideoDto } from './create-video.dto';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
  video: IVideo;
}
