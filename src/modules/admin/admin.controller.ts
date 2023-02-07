import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ADMIN_AUTH_JWT } from 'src/constants/auth-strategy-names';
import { AdminService } from './admin.service';
import CreateAdminDTO from './dto/create-admin.dto';
import UpdateAdminDTO from './dto/update-admin.dto';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthGuard(ADMIN_AUTH_JWT))
  @Get('/:id')
  getAdminById(@Param('id') adminId: string) {
    return this.adminService.findById(adminId);
  }

  @UseGuards(AuthGuard(ADMIN_AUTH_JWT))
  @Get()
  getAdminList() {
    return this.adminService.findAll();
  }

  @UseGuards(AuthGuard(ADMIN_AUTH_JWT))
  @Post()
  addNewAdmin(@Body() createAdminDto: CreateAdminDTO) {
    return this.adminService.createNewAdmin(createAdminDto.adminDetails);
  }

  @UseGuards(AuthGuard(ADMIN_AUTH_JWT))
  @Put(':id')
  updateAdmin(
    @Param('id') adminId: string,
    @Body() updateAdminDto: UpdateAdminDTO,
  ) {
    return this.adminService.updateAdmin(adminId, updateAdminDto.adminDetails);
  }
}
