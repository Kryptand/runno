import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserApiModule, UserEntity } from '@runno/user/api';
import { AuthApiModule } from '@runno/auth/api';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'app.db',
      entities: [UserEntity],
      logging: true,
      synchronize: true,
    }),
    UserApiModule,
    AuthApiModule,
  ],
})
export class AppModule {}
