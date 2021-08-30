import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { ActivityTypeEntity } from '@runno/activity-types/api';
import { UserEntity } from '@runno/user/api';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Entity()
export class ActivityEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @ManyToOne(() => ActivityTypeEntity)
  type: ActivityTypeEntity;
  @ManyToOne(() => UserEntity, (user) => user.activities)
  user: UserEntity;
  @Column()
  @RelationId((activity: ActivityEntity) => activity.user)
  userId: string;
  @Column()
  @IsNumber()
  @IsNotEmpty()
  calculatedPoints: number;
  @Column()
  @IsNumber()
  @IsNotEmpty()
  distanceInKm: number;
  @Column()
  @IsNumber()
  @IsNotEmpty()
  timeInMinutes: number;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
