import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ADMIN_AUTH_LOCAL,
  STUDENT_AUTH_LOCAL,
} from 'src/constants/auth-strategy-names';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard(ADMIN_AUTH_LOCAL))
  @Post('/admin/login')
  adminLogin(@Request() req) {
    return this.authService.loginAdmin(req.user);
  }

  @UseGuards(AuthGuard(STUDENT_AUTH_LOCAL))
  @Post('/student/login')
  studentLogin(@Request() req) {
    return this.authService.loginStudentGetJwt(req.user);
  }
}
