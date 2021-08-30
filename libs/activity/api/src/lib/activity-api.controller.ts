import {
  Crud,
  CrudAuth,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Controller, Req, UseGuards } from '@nestjs/common';
import { ActivityEntity } from './activity.entity';
import { ActivityService } from './activity-api.service';
import { JwtAuthGuard } from '@runno/auth/api';
import { LeaderboardService } from '../../../../leaderboard/api/src/lib/leaderboard-service';

@Crud({
  model: {
    type: ActivityEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    join: {
      type: {
        eager: true,
      },
    },
    sort: [
      {
        field: 'createdAt',
        order: 'DESC',
      },
    ],
  },
})
@Controller('activity')
@UseGuards(JwtAuthGuard)
@CrudAuth({
  property: 'user',
  filter: (user) => {
    return {
      userId: user.userId,
    };
  },
  persist: (user) => {
    return {
      userId: user.userId,
    };
  },
})
export class ActivityApiController implements CrudController<ActivityEntity> {
  constructor(
    public service: ActivityService,
    private leaderBoard: LeaderboardService
  ) {}
  @Override('createOneBase')
  async createOneAndUpdateLeaderboard(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ActivityEntity,
    @Req() request: any
  ): Promise<ActivityEntity> {
    const created = await this.service.createOne(req, dto);
    const activities = await this.service.find({
      where: { user: { id: request.user.userId } },
    });
    if (activities) {
      await this.leaderBoard.calculateTotalPoints(request.user, activities);
    }
    return created;
  }

  @Override('updateOneBase')
  async updateOneAndUpdateLeaderboard(
    req: CrudRequest,
    dto: ActivityEntity,
    @Req() request: any
  ): Promise<ActivityEntity> {
    const updated = await this.service.updateOne(req, dto);
    const activities = await this.service.find({
      where: { user: { id: request.user.userId } },
    });
    if (activities) {
      await this.leaderBoard.calculateTotalPoints(request.user, activities);
    }
    return updated;
  }
  @Override('deleteOneBase')
  async deleteOneAndUpdateLeaderboard(
    @ParsedRequest() req: CrudRequest,
    @Req() request: any
  ): Promise<void | ActivityEntity> {
    const deleted = await this.service.deleteOne(req);
    const activities = await this.service.find({
      where: { user: { id: request.user.userId } },
    });
    if (activities) {
      await this.leaderBoard.calculateTotalPoints(request.user, activities);
    }
    return deleted;
  }
}
