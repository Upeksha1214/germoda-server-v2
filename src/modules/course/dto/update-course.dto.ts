import { PartialType } from '@nestjs/mapped-types';
<<<<<<< HEAD
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
=======
import Icourse from 'src/interfaces/course.intface';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    course:Icourse
}
>>>>>>> 9c3dc6c85da2a9dda03e7cbb94dc999496fd8fa1
