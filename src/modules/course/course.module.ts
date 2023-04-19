import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CourseMongooseModule } from '../../schemas/course.schema';

@Module({
  imports: [CourseMongooseModule],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
