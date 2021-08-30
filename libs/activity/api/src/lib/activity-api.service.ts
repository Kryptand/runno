import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityEntity } from './activity.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ActivityTypeEntity } from '@runno/activity-types/api';

@Injectable()
export class ActivityService extends TypeOrmCrudService<ActivityEntity> {
  constructor(
    @InjectRepository(ActivityEntity)
    private ActivityRepository: Repository<ActivityEntity>
  ) {
    super(ActivityRepository);
  }
  async updatePointsForActivityType(activityType: ActivityTypeEntity) {
    const usedActivities = await this.repo.find({
      where: { type: { id: activityType.id } },
    });
    for (const usedEntity of usedActivities) {
      await this.repo
        .createQueryBuilder()
        .update(ActivityEntity)
        .set({
          calculatedPoints: () =>
            `${this.calcPoints(usedEntity, activityType)}`,
        })
        .whereInIds(usedEntity.id)
        .execute();
    }
  }

  private calcPoints(
    usedEntity: ActivityEntity,
    activityType: ActivityTypeEntity
  ) {
    const max = activityType.maxDistancePerDayInKm;
    if (usedEntity.distanceInKm >= max) {
      usedEntity.distanceInKm = max;
    }
    return Math.round(usedEntity.distanceInKm * activityType.points);
  }
}
