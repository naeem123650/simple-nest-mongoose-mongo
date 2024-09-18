import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { CreateUserDto } from '../dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/users.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUser(id: number) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(userDto);
    return user.save();
  }

  async updateUser(userDto: UpdateUserDto, id: number) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, userDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return updatedUser;
  }

  async deleteUser(id: number) {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}
