import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserApiModule, UserEntity } from '@runno/user/api';
import { AuthApiModule } from '@runno/auth/api';
import { ActivityApiModule, ActivityEntity } from '@runno/activity/api';
import {
  ActivityTypeEntity,
  ActivityTypesApiModule,
} from '@runno/activity-types/api';
import {
  TeamSettingsApiModule,
  TeamSettingsEntity,
} from '@runno/team-settings/api';
import { LeaderboardEntity } from '../../../../libs/leaderboard/api/src/lib/leaderboard.entity';
import { LeaderboardApiModule } from '@runno/leaderboard/api';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'wnUNWuynPa038A',
      database: 'laufchallenge',
      keepConnectionAlive: true,
      synchronize: true,
      entities: [
        UserEntity,
        ActivityEntity,
        ActivityTypeEntity,
        TeamSettingsEntity,
        LeaderboardEntity,
      ],
    }),
    UserApiModule,
    AuthApiModule,
    ActivityApiModule,
    ActivityTypesApiModule,
    TeamSettingsApiModule,
    LeaderboardApiModule,
  ],
})
export class AppModule {}
