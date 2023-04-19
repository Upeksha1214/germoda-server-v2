import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IInquiry from '../../interfaces/inquiry.interface';
import { InquiryDocument } from '../../schemas/inquiry.schema';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { UpdateInquiryDto } from './dto/update-inquiry.dto';
import { Inquiry } from './entities/inquiry.entity';

@Injectable()
export class InquiryService {
  constructor(
    @InjectModel(Inquiry.name)
    private inquerModel: Model<InquiryDocument>,
  ) {}

  async create(inquiry: IInquiry) {
    return await new this.inquerModel(inquiry).save();
  }

  async findAll() {
    return await this.inquerModel.find();
  }

  async findById(id: string) {
    try {
      const result = await this.inquerModel.findById(id);

      return result;
    } catch (error) {
      console.log('online class record not found');
      return null;
    }
  }

  async update(id: string, updateInquiryDto: UpdateInquiryDto) {
    return await this.inquerModel.findByIdAndUpdate(id, updateInquiryDto);
  }

  async remove(id: string) {
    return await this.inquerModel.findByIdAndRemove(id);
  }
}
