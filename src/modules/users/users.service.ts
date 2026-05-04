import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.service.repository';
import { User } from './models/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id);
  }

  async createUser(
    name: string,
    email: string,
    passwordHash: string,
  ): Promise<User> {
    return this.usersRepository.createUser(name, email, passwordHash);
  }
}
