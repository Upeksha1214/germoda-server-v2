import { PartialType } from '@nestjs/mapped-types';
import Icourse from '../../../interfaces/course.interface';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  course: Icourse;
}
