import { Body, Controller, Post } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Crud, CrudController } from '@nestjsx/crud';
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
