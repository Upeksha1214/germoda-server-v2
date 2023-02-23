import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from 'src/schemas/student.schema';
import CreateStudentRequestDTO from './dto/create-student-req.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  async createStudent(requestDto: CreateStudentRequestDTO) {
    const { password } = requestDto;

    try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const savedStudent = await new this.studentModel({
        ...requestDto,
        password: encryptedPassword,
      }).save();

      // Password should not be returned
      const { email, _id } = savedStudent;

      return Object.freeze({ email, _id });
    } catch (exception) {
      console.log(exception);
    }
  }

  async getStudentById(studentId: string) {
    return await this.studentModel.findById(studentId);
  }

  async getStudentByUsername(username: string) {
    return await this.studentModel.findOne({ username });
  }
  async getAllStudents() {
    return await this.studentModel.find();
  }
}
