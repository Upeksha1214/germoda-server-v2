import { PartialType } from '@nestjs/mapped-types';
import IOnlineClass from 'src/interfaces/online-class.interface';
import { CreateOnlineClassDto } from './create-online-class.dto';

export class UpdateOnlineClassDto extends PartialType(CreateOnlineClassDto) {
  onlineClass: IOnlineClass;
}
