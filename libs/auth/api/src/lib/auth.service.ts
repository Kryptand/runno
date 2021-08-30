import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UserService } from '@runno/user/api';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      return null;
    }
    if (compareSync(pass, user?.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(username: string, password: string) {
    const validated = await this.validateUser(username, password);
    if (!validated) {
      throw new HttpException('Wrong credentials', HttpStatus.BAD_REQUEST);
    } else {
      const payload = {
        username: validated.username,
        team: validated?.team?.title,
        sub: validated.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
