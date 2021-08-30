import { Module } from '@nestjs/common';
import { LeaderboardController } from './leaderboard-controller';
import { LeaderboardService } from './leaderboard-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaderboardEntity } from './leaderboard.entity';

@Module({
  controllers: [LeaderboardController],
  providers: [LeaderboardService],
  exports: [LeaderboardService],
  imports: [TypeOrmModule.forFeature([LeaderboardEntity])],
})
export class LeaderboardApiModule {}
