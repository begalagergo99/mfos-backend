import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  name!: string;

  @IsEmail()
  @Transform(({ value }) => value?.trim().toLowerCase())
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}