import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Jane Doe', description: 'Full name of the new user' })
  @IsString()
  @Transform(({ value }) => value?.trim())
  name!: string;

  @ApiProperty({ example: 'jane@example.com', description: 'Email address (must be unique)' })
  @IsEmail()
  @Transform(({ value }) => value?.trim().toLowerCase())
  email!: string;

  @ApiProperty({ example: 'secret123', description: 'Password — minimum 6 characters', minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;
}