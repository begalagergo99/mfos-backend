import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/entities/user.entity';
import { UsersRepository } from './users.service.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersRepository, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
