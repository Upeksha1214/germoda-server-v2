import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'auth-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'auth-jwt-ws') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

// reference: https://github.com/nestjs/nest/issues/3206
export class WsJwtGuard extends AuthGuard('auth-jwt-ws') {
  getRequest(context) {
    return context.switchToWs().getClient().handshake;
  }
}
