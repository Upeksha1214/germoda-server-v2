import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from '../admin/admin.module';
import { AdminService } from '../admin/admin.service';
import { StudentModule } from '../student/student.module';
import { StudentService } from '../student/student.service';
import { AuthService } from './auth.service';
import { AdminLocalStrategy, StudentLocalStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth-jwt.strategy';

@Module({
  imports: [
    AdminModule,
    StudentModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
      }),
    }),
  ],
  providers: [
    AuthService,
    AdminService,
    StudentService,
    AdminLocalStrategy,
    StudentLocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
