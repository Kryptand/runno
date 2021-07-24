import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  password!: string;
}
