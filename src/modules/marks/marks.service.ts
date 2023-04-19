import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IMarks from '../../interfaces/marks.interface';
import { Marks, MarksDocument } from '../../schemas/marks.schema';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { MarksModule } from './marks.module';

@Injectable()
export class MarksService {
  constructor(
    @InjectModel(Marks.name)
    private marksModule: Model<MarksDocument>,
  ) {}

  async create(marks: IMarks) {
    return await new this.marksModule(marks).save();
  }

  async findAll() {
    return await this.marksModule.find();
  }

  async findById(id: string) {
    try {
      const marks = await this.marksModule.findById(id);
      return marks;
    } catch (error) {
      console.log('marks record not found');
      return null;
    }
  }

  async update(id: string, updateMarkDto: UpdateMarkDto) {
    return await this.marksModule.findByIdAndUpdate(id, updateMarkDto);
  }

  async remove(id: string) {
    return await this.marksModule.findByIdAndRemove(id);
  }
}
