import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Registration, RegistrationDocument } from 'src/schemas/registration.schemas';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel(Registration.name)
    private registrationModel:Model<RegistrationDocument>
  ){}

  async create(createRegistrationDto: CreateRegistrationDto) {
    return await new this.registrationModel(createRegistrationDto).save();
  }

  async findAll() {
    return await this.registrationModel.find();
  }

  async findOne(id: string) {
    return await this.registrationModel.findById(id);
  }

  async update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
    return await this.registrationModel.findByIdAndUpdate(
      id,
      updateRegistrationDto.registration,
    );
  }

  async remove(id: String) {
    return await this.registrationModel.remove(id) ;
  }
}
