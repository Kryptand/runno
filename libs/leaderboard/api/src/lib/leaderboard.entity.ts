import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { UserEntity } from '@runno/user/api';

@Entity()
export class LeaderboardEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @ManyToOne(() => UserEntity, (user) => user.activities, { eager: true })
  user: UserEntity;
  @Column()
  @IsNumber()
  @IsNotEmpty()
  calculatedPoints: number;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
