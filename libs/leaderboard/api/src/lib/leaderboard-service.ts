import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaderboardEntity } from './leaderboard.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ActivityEntity } from '@runno/activity/api';

@Injectable()
export class LeaderboardService extends TypeOrmCrudService<LeaderboardEntity> {
  constructor(
    @InjectRepository(LeaderboardEntity)
    private LeaderboardRepository: Repository<LeaderboardEntity>
  ) {
    super(LeaderboardRepository);
  }
  async calculateTotalPoints(user: any, activities: ActivityEntity[]) {
    const currentData = await this.repo.find({
      where: { user: { id: user.userId } },
    });
    if (currentData && currentData.length > 0) {
      const id = currentData[0].id;
      await this.repo.delete(id);
    }
    const leaderBoard = new LeaderboardEntity();
    leaderBoard.user = { id: user.userId } as any;
    leaderBoard.calculatedPoints = activities
      .map((activity) => activity.calculatedPoints)
      .reduce((a, b) => a + b);
    return this.repo.save(leaderBoard);
  }
}
