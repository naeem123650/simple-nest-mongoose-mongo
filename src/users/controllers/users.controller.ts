import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../dto/createUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { UsersService } from '../services/users.service';
import { AgeCastPipe } from '../pipes/age-cast/age-cast.pipe';

@Controller('users')
// @UseGuards()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers(@Res() res: Response) {
    const users = this.userService.getUsers();

    res.json({
      success: true,
      data: users,
    });
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const user = this.userService.getUser(id);

    res.json({
      success: true,
      data: user,
    });
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createUser(@Body(AgeCastPipe) userDto: CreateUserDto, @Res() res: Response) {
    const user = this.userService.createUser(userDto);

    res.json({
      success: true,
      data: user,
    });
  }

  @Patch(':id')
  updateUser(
    @Body(AgeCastPipe) userDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const user = this.userService.updateUser(userDto, id);

    res.json({
      success: true,
      data: user,
    });
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const status = this.userService.deleteUser(id);

    if (status) {
      res.json({
        success: true,
        message: 'User deleted successfully.',
      });
    } else {
      throw new HttpException('Something went wrong..', HttpStatus.BAD_REQUEST);
    }
  }
}
