import { Module } from '@nestjs/common';
import { MarksService } from './marks.service';
import { MarksController } from './marks.controller';
import { MarksMongooseModule } from '../../schemas/marks.schema';

@Module({
  imports: [MarksMongooseModule],
  controllers: [MarksController],
  providers: [MarksService],
})
export class MarksModule {}
