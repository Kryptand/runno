import { HttpException, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
    private jwt: JwtService
  ) {}
  findByMail(email: string) {
    return this.repo.findOne({ email: email });
  }
  async createUser(user: CreateUserDto) {
    try {
      const createdUser = await this.repo.save(user);
      return this.createToken(createdUser);
    } catch (e) {
      throw new HttpException('Bad request', 400);
    }
  }
  private createToken(user: UserEntity) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
