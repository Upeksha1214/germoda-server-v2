import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IVideo from '../../interfaces/video.interface';
import { Video, VideoDocument } from '../../schemas/video.schema';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name)
    private videoModule: Model<VideoDocument>,
  ) {}

  async create(video: IVideo) {
    return await new this.videoModule(video).save();
  }

  async findAll() {
    return await this.videoModule.find();
  }

  async findOne(id: string) {
    return await this.videoModule.findById(id);
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    return await this.videoModule.findByIdAndUpdate(id, updateVideoDto.video);
  }

  async remove(id: string) {
    return await this.videoModule.findByIdAndRemove(id);
  }
}
