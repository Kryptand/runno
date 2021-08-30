import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityTypeEntity } from './activity-type.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ActivityTypeService extends TypeOrmCrudService<ActivityTypeEntity> {
  constructor(
    @InjectRepository(ActivityTypeEntity)
    private ActivityTypeRepository: Repository<ActivityTypeEntity>
  ) {
    super(ActivityTypeRepository);
  }
}
