import {
  Index,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { hash } from 'bcrypt';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ActivityEntity } from '@runno/activity/api';
import { TeamSettingsEntity } from '../../../../team-settings/api/src/lib/team-settings.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column()
  @Index({ unique: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  username!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @Column({ type: 'nvarchar' })
  password!: string;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
  @ManyToOne(() => TeamSettingsEntity, { eager: true })
  team!: TeamSettingsEntity;

  @OneToMany(() => ActivityEntity, (photo) => photo.user)
  activities?: ActivityEntity[];
}
