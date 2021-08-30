import { Module } from '@nestjs/common';
import { TeamSettingsController } from './team-settings.controller';
import { TeamSettingsService } from './team-settings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamSettingsEntity } from './team-settings.entity';

@Module({
  controllers: [TeamSettingsController],
  providers: [TeamSettingsService],
  exports: [TeamSettingsService],
  imports: [TypeOrmModule.forFeature([TeamSettingsEntity])],
})
export class TeamSettingsApiModule {}
