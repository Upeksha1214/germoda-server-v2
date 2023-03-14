import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IMarks from 'src/interfaces/marks.interface';
import { Marks, MarksDocument } from 'src/schemas/marks.schema';
import { CreateMarkDto } from './dto/create-mark.dto';
import { UpdateMarkDto } from './dto/update-mark.dto';
import { MarksModule } from './marks.module';

@Injectable()
export class MarksService {
  
  constructor(
    @InjectModel(Marks.name)
  private marksModule :Model<MarksDocument>
  ){}

  async create(marks: IMarks) {
    return await new this.marksModule(marks).save();
  }

  findAll() {
    return `This action returns all marks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mark`;
  }

  update(id: number, updateMarkDto: UpdateMarkDto) {
    return `This action updates a #${id} mark`;
  }

  remove(id: number) {
    return `This action removes a #${id} mark`;
  }
}
