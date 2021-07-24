import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'shawandasecret',
      signOptions: { expiresIn: '360s' },
    }),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserApiModule {}
