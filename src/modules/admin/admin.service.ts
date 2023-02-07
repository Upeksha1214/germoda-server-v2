import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IAdmin from 'src/interfaces/admin.interface';
import { Admin, AdminDocument } from 'src/schemas/admin.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async findById(adminId: string) {
    return await this.adminModel.findById(adminId);
  }

  async findAll() {
    return await this.adminModel.find();
  }

  async findByUsername(username: string) {
    return await this.adminModel.find({ username });
  }

  async createNewAdmin(adminDetails: IAdmin) {
    const { password } = adminDetails;

    try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const savedAdmin = await new this.adminModel({
        ...adminDetails,
        password: encryptedPassword,
      }).save();

      // Password should not be returned
      const { username, _id } = savedAdmin;

      return Object.freeze({ username, _id });
    } catch (exception) {
      console.log(exception);
    }
  }

  async updateAdmin(adminId: string, adminDetails: IAdmin) {
    const { password } = adminDetails;

    try {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const updatedAdmin = await this.adminModel.findOneAndUpdate(
        { _id: adminId },
        { ...adminDetails, password: encryptedPassword },
      );

      // Password should not be returned
      const { username, _id } = updatedAdmin;

      return Object.freeze({ username, _id });
    } catch (exception) {
      console.log(exception);
    }
  }
}
