import { PartialType } from '@nestjs/mapped-types';
import IPayment from 'src/interfaces/payment.interface';
import { CreatePaymentDto } from './create-payment.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  paymentDetails: IPayment;
}
