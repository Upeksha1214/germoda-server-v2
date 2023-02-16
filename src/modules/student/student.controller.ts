import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ADMIN_AUTH_JWT } from 'src/constants/auth-strategy-names';
import CreateStudentRequestDTO from './dto/create-student-req.dto';
import { StudentService } from './student.service';

@Controller('/api/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(AuthGuard(ADMIN_AUTH_JWT))
  @Post('/')
  async createNewStudent(@Body() createStudentDTO: CreateStudentRequestDTO) {
    return await this.studentService.createStudent(createStudentDTO);
  }

  @UseGuards(AuthGuard(ADMIN_AUTH_JWT))
  @Get('/:id')
  async getStudentById(@Param('id') studentId: string) {
    return this.studentService.getStudentById(studentId);
  }
}
