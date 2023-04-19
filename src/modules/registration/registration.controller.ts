import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ADMIN_AUTH_JWT,
  STUDENT_AUTH_JWT,
} from '../../constants/auth-strategy-names';

@Controller('/api/registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('/')
  async create(@Body() createRegistrationDto: CreateRegistrationDto) {
    return await this.registrationService.create(
      createRegistrationDto.registration,
    );
  }

  @UseGuards(AuthGuard(ADMIN_AUTH_JWT))
  @Get()
  findAll() {
    return this.registrationService.findAll();
  }

  @UseGuards(AuthGuard(ADMIN_AUTH_JWT))
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.registrationService.findOne(id);
  }

  @UseGuards(AuthGuard(ADMIN_AUTH_JWT))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegistrationDto: UpdateRegistrationDto,
  ) {
    return this.registrationService.update(id, updateRegistrationDto);
  }

  @UseGuards(AuthGuard(ADMIN_AUTH_JWT))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registrationService.remove(id);
  }
}
