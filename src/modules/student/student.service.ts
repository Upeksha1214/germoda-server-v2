import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from 'src/schemas/student.schema';
import CreateStudentRequestDTO from './dto/create-student-req.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  async createStudent(requestDto: CreateStudentRequestDTO) {
    return await new this.studentModel(requestDto).save();
  }

  async getStudentById(studentId: string) {
    return await this.studentModel.findById(studentId);
  }

  async getStudentByUsername(username: string) {
    return await this.studentModel.findOne({ username });
  }
}
