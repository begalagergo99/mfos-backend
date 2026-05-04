import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', description: 'Unique user identifier (UUID)' })
  id!: string;

  @ApiProperty({ example: 'Jane Doe', description: 'Full name of the user' })
  name!: string;

  @ApiProperty({ example: 'jane@example.com', description: 'User email address' })
  email!: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z', description: 'Timestamp when the account was created' })
  createdAt!: Date;
}

export class AuthResponseDto {
  @ApiProperty({ description: 'Authenticated user profile' })
  user!: UserDto;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'JWT Bearer access token — include in Authorization header as `Bearer <token>`' })
  accessToken!: string;
}