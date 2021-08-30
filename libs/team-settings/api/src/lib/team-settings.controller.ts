import { Injectable } from '@angular/core';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { ActivityEntity, ActivityService } from '@runno/activity/api';
import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@runno/auth/api';
import { TeamSettingsService } from './team-settings.service';
import { TeamSettingsEntity } from './team-settings.entity';

@Crud({
  model: {
    type: TeamSettingsEntity,
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
  },
})
@Controller('team-settings')
export class TeamSettingsController
  implements CrudController<TeamSettingsEntity>
{
  constructor(public service: TeamSettingsService) {}
}
