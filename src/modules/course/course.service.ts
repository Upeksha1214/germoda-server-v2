import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { timeStamp } from 'console';
import { Model } from 'mongoose';
import Icourse from '../../interfaces/course.interface';
import { Course, CourseDocument } from '../../schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course.name)
    private courseModel: Model<CourseDocument>,
  ) {}

  async create(course: Icourse) {
    return await new this.courseModel(course).save();
  }

  async findAll() {
    return await this.courseModel.find();
  }

  async findOne(id: string) {
    return await this.courseModel.findById(id);
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return await this.courseModel.findByIdAndUpdate(id, updateCourseDto.course);
  }

  async remove(id: string) {
    return await this.courseModel.findByIdAndRemove(id);
  }
}
