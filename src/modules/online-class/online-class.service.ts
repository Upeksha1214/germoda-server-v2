import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOnlineClassDto } from './dto/create-online-class.dto';
import { UpdateOnlineClassDto } from './dto/update-online-class.dto';
import {
  OnlineClass,
  OnlineClassDocument,
} from '../../schemas/online-class.schema';
import { Model } from 'mongoose';

@Injectable()
export class OnlineClassService {
  constructor(
    @InjectModel(OnlineClass.name)
    private onlineClassModel: Model<OnlineClassDocument>,
  ) {}

  async create(createOnlineClassDto: CreateOnlineClassDto) {
    return await new this.onlineClassModel(createOnlineClassDto).save();
  }

  async findAll() {
    return await this.onlineClassModel.find();
  }

  async findById(id: string) {
    return await this.onlineClassModel.findById(id);
  }

  async update(id: string, updateOnlineClassDto: UpdateOnlineClassDto) {
    return await this.onlineClassModel.findByIdAndUpdate(
      id,
      updateOnlineClassDto,
    );
  }

  // TODO: do we need softdelete?
  async remove(id: string) {
    return `This action removes a #${id} onlineClass`;
  }
}
