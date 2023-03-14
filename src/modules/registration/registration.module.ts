import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { RegistrationMongooseModule } from 'src/schemas/registration.schemas';

@Module({
  imports:[RegistrationMongooseModule],
  controllers: [RegistrationController],
  providers: [RegistrationService]
})
export class RegistrationModule {}
