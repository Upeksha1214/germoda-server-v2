import { Injectable } from '@nestjs/common';
import { StudentService } from '../student/student.service';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentService: StudentService,
    private readonly adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async authenticateAdmin(username: string, password: string) {
    const adminList: any = await this.adminService.findByUsername(username);
    const admin = adminList[0];
    if (admin.password === password) {
      return admin;
    }
    return null;
  }

  async loginAdmin(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async authenticateStudent(username: string, password: string) {
    const user = await this.studentService.getStudentByUsername(username);
    if (user[0].password === password) {
      return user[0];
    }
    return null;
  }
}
