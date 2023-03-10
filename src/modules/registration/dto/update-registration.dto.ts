import { PartialType } from '@nestjs/mapped-types';
import IRegistration from 'src/interfaces/registration.interface';
import { CreateRegistrationDto } from './create-registration.dto';

export class UpdateRegistrationDto extends PartialType(CreateRegistrationDto) {
    registration:IRegistration
}
