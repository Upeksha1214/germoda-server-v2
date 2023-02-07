import { Module } from '@nestjs/common';
import { AdminMongooseModule } from 'src/schemas/admin.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [AdminMongooseModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService, AdminMongooseModule],
})
export class AdminModule {}
