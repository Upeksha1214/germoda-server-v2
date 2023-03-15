import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { VideoMongooseModule } from 'src/schemas/video.schema';

@Module({
  imports:[VideoMongooseModule],
  controllers: [VideoController],
  providers: [VideoService]
})
export class VideoModule {}
