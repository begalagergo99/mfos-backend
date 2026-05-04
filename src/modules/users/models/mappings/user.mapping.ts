import { UserDto } from '../../../auth/models/dto/auth-response.dto';
import { User } from '../entities/user.entity';

export const toUserDto = (user: User): UserDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
});
