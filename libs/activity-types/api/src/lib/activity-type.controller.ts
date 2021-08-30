import { ActivityTypeEntity } from './activity-type.entity';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { Controller, forwardRef, Inject, UseGuards } from '@nestjs/common';
import { ActivityTypeService } from './activity-type.service';
import { JwtAuthGuard } from '@runno/auth/api';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ActivityService } from '@runno/activity/api';

@Crud({
  model: {
    type: ActivityTypeEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
@Controller('activity-type')
@UseGuards(JwtAuthGuard)
export class ActivityTypeController
  implements CrudController<ActivityTypeEntity>
{
  constructor(
    public service: ActivityTypeService,
    @Inject(forwardRef(() => ActivityService))
    private activityService: ActivityService
  ) {}

  @Override('updateOneBase')
  async updateDieActivityTypesJunge(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: ActivityTypeEntity
  ): Promise<ActivityTypeEntity> {
    const update = await this.service.updateOne(req, dto);
    await this.activityService.updatePointsForActivityType(update);
    return update;
  }
}
