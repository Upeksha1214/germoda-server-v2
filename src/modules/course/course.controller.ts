<<<<<<< HEAD
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
=======
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ADMIN_AUTH_LOCAL, STUDENT_AUTH_LOCAL } from 'src/constants/auth-strategy-names';
>>>>>>> 9c3dc6c85da2a9dda03e7cbb94dc999496fd8fa1
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

<<<<<<< HEAD
@Controller('course')
=======
@UseGuards(AuthGuard(ADMIN_AUTH_LOCAL))
@Controller('/api/course')
>>>>>>> 9c3dc6c85da2a9dda03e7cbb94dc999496fd8fa1
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

<<<<<<< HEAD
=======
  @UseGuards(AuthGuard(STUDENT_AUTH_LOCAL))
>>>>>>> 9c3dc6c85da2a9dda03e7cbb94dc999496fd8fa1
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

<<<<<<< HEAD
=======
  @UseGuards(AuthGuard(STUDENT_AUTH_LOCAL))
>>>>>>> 9c3dc6c85da2a9dda03e7cbb94dc999496fd8fa1
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
