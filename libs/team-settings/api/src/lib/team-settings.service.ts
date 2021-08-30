import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamSettingsEntity } from './team-settings.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class TeamSettingsService extends TypeOrmCrudService<TeamSettingsEntity> {
  constructor(
    @InjectRepository(TeamSettingsEntity)
    private TeamSettingsRepository: Repository<TeamSettingsEntity>
  ) {
    super(TeamSettingsRepository);
  }
}
