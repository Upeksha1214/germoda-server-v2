import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IRegistration from '../../interfaces/registration.interface';

import {
  Registration,
  RegistrationDocument,
} from '../../schemas/registration.schemas';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel(Registration.name)
    private registrationModel: Model<RegistrationDocument>,
  ) {}

  async create(registration: IRegistration) {
    return await new this.registrationModel(registration).save();
  }

  async findAll() {
    return await this.registrationModel.find();
  }

  async findOne(id: string) {
    return await this.registrationModel.findById(id);
  }

  async update(id: string, updateRegistrationDto: UpdateRegistrationDto) {
    return await this.registrationModel.findByIdAndUpdate(
      id,
      updateRegistrationDto.registration,
    );
  }

  async remove(id: string) {
    return await this.registrationModel.findByIdAndRemove(id);
  }
}
