import { Module } from '@nestjs/common';
import { UserApiModule } from '@runno/user/api';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserApiModule,
    PassportModule,
    JwtModule.register({
      secret: 'shawandasecret',
      signOptions: { expiresIn: '360s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthApiModule {}
