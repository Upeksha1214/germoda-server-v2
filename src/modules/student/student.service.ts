import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from 'src/schemas/student.schema';
import CreateStudentRequestDTO from './dto/create-student-req.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
import { UpdateStuduntClassDto } from './dto/update-student.dto';


@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  async createStudent(requestDto: CreateStudentRequestDTO) {
    const { password } = requestDto.student;

    try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const savedStudent = await new this.studentModel({
        ...requestDto.student,
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
    const student= await this.studentModel.findById(studentId);
    delete student.password
    return student
  }

  async getStudentByUsername(username: string) {
    return await this.studentModel.findOne({ email: username });
  }
  async getAllStudents() {
    return await this.studentModel.find({},"studentId studentName email course birthday NIC gender address courseName courseDuration country state");
  }

  async findAll(){
    return await this.studentModel.find();
  }

  async update(studentId:string, updateStuduntClassDto:UpdateStuduntClassDto ){
    return await this.studentModel.findByIdAndUpdate(
      studentId,
      updateStuduntClassDto.student,
    );
  }

  async remove(studentId:string){
    return await this.studentModel.findByIdAndRemove(studentId);
  }
 
}
