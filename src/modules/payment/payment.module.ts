import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentMongooseModule } from 'src/schemas/payment.schema';

@Module({
  imports: [PaymentMongooseModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
