import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

@Entity()
export class ActivityTypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;
  @Column()
  @Index({ unique: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  title!: string;
  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  color!: string;
  @Column()
  @IsNumber()
  @IsNotEmpty()
  maxDistancePerDayInKm!: number;
  @Column()
  @IsNumber()
  @IsNotEmpty()
  points!: number;

  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
}
