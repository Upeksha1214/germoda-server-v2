import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ADMIN_AUTH_LOCAL,
  STUDENT_AUTH_LOCAL,
} from 'src/constants/auth-strategy-names';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(
  Strategy,
  ADMIN_AUTH_LOCAL,
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.authenticateAdmin(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

@Injectable()
export class StudentLocalStrategy extends PassportStrategy(
  Strategy,
  STUDENT_AUTH_LOCAL,
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.authenticateStudent(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
