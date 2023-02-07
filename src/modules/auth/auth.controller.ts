import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ADMIN_AUTH_LOCAL } from 'src/constants/auth-strategy-names';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard(ADMIN_AUTH_LOCAL))
  @Post('/admin/login')
  adminLogin(@Request() req) {
    return this.authService.loginAdmin(req.user);
  }
}
