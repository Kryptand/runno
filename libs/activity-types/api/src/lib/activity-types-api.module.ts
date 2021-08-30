import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityTypeEntity } from './activity-type.entity';
import { ActivityTypeService } from './activity-type.service';
import { ActivityTypeController } from './activity-type.controller';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { ActivityApiModule } from '@runno/activity/api';

@Module({
  controllers: [ActivityTypeController],
  providers: [ActivityTypeService],
  exports: [ActivityTypeService],
  imports: [
    TypeOrmModule.forFeature([ActivityTypeEntity]),
    forwardRef(() => ActivityApiModule),
  ],
})
export class ActivityTypesApiModule {}
