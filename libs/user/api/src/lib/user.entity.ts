import {
  Index,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { hash } from 'bcrypt';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @Column()
  @Index({ unique: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  @Column({ type: 'nvarchar', select: false })
  password!: string;
  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
