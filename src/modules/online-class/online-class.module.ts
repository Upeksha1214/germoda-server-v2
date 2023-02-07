import { Module } from '@nestjs/common';
import { OnlineClassService } from './online-class.service';
import { OnlineClassController } from './online-class.controller';
import { OnlineClassMongooseModule } from 'src/schemas/online-class.schema';

@Module({
  imports: [OnlineClassMongooseModule],
  controllers: [OnlineClassController],
  providers: [OnlineClassService],
})
export class OnlineClassModule {}
