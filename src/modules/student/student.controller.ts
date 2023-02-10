import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards  } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ADMIN_AUTH_LOCAL } from 'src/constants/auth-strategy-names';
import CreateStudentRequestDTO from './dto/create-student-req.dto';
import { UpdateStuduntClassDto } from './dto/update-student.dto';
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

  @Get('/:username')
  async getStudentByUsername(@Param('username')username:string){
    return this.studentService.getStudentByUsername(username);
  }
  
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id:string,
    @Body() updateStuduntClassDto : UpdateStuduntClassDto,
  ){
    return this.studentService.update(id,updateStuduntClassDto);
  }

  remove(@Param('id') id :string){
    return this.studentService.remove(id);
  }
}
