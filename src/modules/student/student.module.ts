import { Module } from '@nestjs/common';
import { StudentMongooseModule } from 'src/schemas/student.schema';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [StudentMongooseModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentMongooseModule, StudentService],
})
export class StudentModule {}
