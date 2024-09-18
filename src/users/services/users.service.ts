import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { CreateUserDto } from '../dto/createUser.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      username: 'naeemv',
      email: 'naeemv@gmail.com',
      password: 'naeem123',
      age: 12,
    },
  ];

  getUsers() {
    return this.users;
  }

  getUser(id: number) {
    const userData = this.users.find((user) => user.id === id);

    if (!userData) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    return userData;
  }

  createUser(userDto: CreateUserDto) {
    this.users.push({ id: this.users.length + 1, ...userDto });
    return userDto;
  }

  updateUser(userDto: UpdateUserDto, id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    this.users[userIndex] = { ...this.users[userIndex], ...userDto };

    return this.users[userIndex];
  }

  deleteUser(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    this.users = this.users.splice(userIndex, 1);

    return true;
  }
}
