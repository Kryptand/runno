import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';


@Controller('user')
export class UserController {
  constructor(public service: UserService) {}
  @Post()
  create(@Body() user: CreateUserDto) {
    return this.service.createUser(user);
  }
}
