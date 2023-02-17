import { Injectable } from '@nestjs/common';
import { StudentService } from '../student/student.service';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { compareAsync } from 'src/utils/bcrypt-compare-async';
// eslint-disable-next-line @typescript-eslint/no-var-requires

@Injectable()
export class AuthService {
  constructor(
    private readonly studentService: StudentService,
    private readonly adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  /**
   * Authenticates admin for the local strategy
   * @author AnupamaCodippily
   * @param username
   * @param password - password sent to compare with the original
   * @returns
   */
  async authenticateAdmin(username: string, password: string) {
    const adminList: any = await this.adminService.findByUsername(username);

    const admin = adminList[0];

    const encryptedPassword = admin.password;

    const isValidUser = await compareAsync(password, encryptedPassword);

    if (isValidUser)
      return {
        username: admin.username,
        sub: admin._id,
      };

    return null;
  }

  /**
   * @author AnupamaCodippily
   * @param user Req.user object
   * @returns
   */
  async loginAdmin(user: any) {
    const payload = { username: user.username, sub: user.sub, role: 'admin' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async authenticateStudent(username: string, password: string) {
    const user = await this.studentService.getStudentByUsername(username);

    const encryptedPassword = user.password;

    const isValidStudent = await compareAsync(password, encryptedPassword);

    if (!isValidStudent) return false;

    return { email: user.email };
  }

  async loginStudentGetJwt(user: any) {
    const payload = { username: user.email, role: 'student' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
