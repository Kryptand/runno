import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UserService } from '@runno/user/api';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByMail(username);
    if (!user) {
      return null;
    }
    if (compareSync(pass, user?.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
