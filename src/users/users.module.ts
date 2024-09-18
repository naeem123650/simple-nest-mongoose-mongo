import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [],
  exports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}
