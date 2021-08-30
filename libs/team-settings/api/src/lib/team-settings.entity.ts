import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class TeamSettingsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
