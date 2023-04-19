import { Module } from '@nestjs/common';
import { InquiryService } from './inquiry.service';
import { InquiryController } from './inquiry.controller';
import { InquiryMongooseModule } from '../../schemas/inquiry.schema';

@Module({
  imports: [InquiryMongooseModule],
  controllers: [InquiryController],
  providers: [InquiryService],
})
export class InquiryModule {}
