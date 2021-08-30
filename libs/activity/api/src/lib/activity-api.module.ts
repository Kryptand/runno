import { Module } from '@nestjs/common';
import { ActivityApiController } from './activity-api.controller';
import { ActivityService } from './activity-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from './activity.entity';
import { LeaderboardApiModule } from '@runno/leaderboard/api';

@Module({
  controllers: [ActivityApiController],
  providers: [ActivityService],
  exports: [ActivityService],
  imports: [TypeOrmModule.forFeature([ActivityEntity]), LeaderboardApiModule],
})
export class ActivityApiModule {}
