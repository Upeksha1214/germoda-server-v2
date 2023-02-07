import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ADMIN_AUTH_LOCAL } from 'src/constants/auth-strategy-names';
import CreateStudentRequestDTO from './dto/create-student-req.dto';
import { StudentService } from './student.service';

@Controller('/api/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(AuthGuard('admin-auth-local'))
  @Post('/')
  async createNewStudent(@Body() createStudentDTO: CreateStudentRequestDTO) {
    return await this.studentService.createStudent(createStudentDTO);
  }

  @UseGuards(AuthGuard(ADMIN_AUTH_LOCAL))
  @Get('/:id')
  async getStudentById(@Param('id') studentId: string) {
    return this.studentService.getStudentById(studentId);
  }
}
