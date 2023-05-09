import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  ADMIN_AUTH_JWT,
  ADMIN_AUTH_JWT_WS,
  STUDENT_AUTH_JWT,
  STUDENT_AUTH_JWT_WS,
} from 'src/constants/auth-strategy-names';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, ADMIN_AUTH_JWT) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (payload?.role !== 'admin') return false;
    return { userId: payload.sub, username: payload.username };
  }
}

@Injectable()
export class StudentJwtStrategy extends PassportStrategy(
  Strategy,
  STUDENT_AUTH_JWT,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (payload?.role !== 'student') return false;

    return { userId: payload.userId, username: payload.username };
  }
}

@Injectable()
export class WsJwtStrategy extends PassportStrategy(
  Strategy,
  ADMIN_AUTH_JWT_WS,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (payload.role !== 'admin') return false;
    return { userId: payload._id, username: payload.username };
  }
}

@Injectable()
export class WsJwtStrategyStudent extends PassportStrategy(
  Strategy,
  STUDENT_AUTH_JWT_WS,
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    if (payload.role !== 'student') return false;
    return { userId: payload.sub, username: payload.username };
  }
}
// reference: https://github.com/nestjs/nest/issues/3206
export class WsJwtGuard extends AuthGuard([ADMIN_AUTH_JWT_WS]) {
  getRequest(context) {
    return context.switchToWs().getClient().handshake;
  }
}

export class WsJwtGuardStudent extends AuthGuard([STUDENT_AUTH_JWT_WS]) {
  getRequest(context) {
    return context.switchToWs().getClient().handshake;
  }
}

export class WsJwtGuardAdminAndStudent extends AuthGuard([
  ADMIN_AUTH_JWT_WS,
  STUDENT_AUTH_JWT_WS,
]) {
  getRequest(context) {
    return context.switchToWs().getClient().handshake;
  }
}
