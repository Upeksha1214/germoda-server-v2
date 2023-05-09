import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateOnlineClassDto } from './dto/update-online-class.dto';
import {
  OnlineClass,
  OnlineClassDocument,
} from '../../schemas/online-class.schema';
import { Model } from 'mongoose';
import IOnlineClass from 'src/interfaces/online-class.interface';

@Injectable()
export class OnlineClassService {
  constructor(
    @InjectModel(OnlineClass.name)
    private onlineClassModel: Model<OnlineClassDocument>,
  ) {}

  async create(onlineClass: IOnlineClass) {
    return await new this.onlineClassModel(onlineClass).save();
  }

  async findAll() {
    return await this.onlineClassModel.find();
  }

  async findById(id: string) {
    try {
      const result = await this.onlineClassModel.findById(id);

      return result;
    } catch (error) {
      console.log('online class record not found');
      return null;
    }
  }

  async findByMeetingUrlId(id: string) {
    try {
      const result = await this.onlineClassModel.findOne({ meetingUrlId: id });

      return result;
    } catch (error) {
      console.log('online class record not found');
      return null;
    }
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
