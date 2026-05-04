import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from 'class-transformer';
import { User } from './models/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [],
    providers: [],
})
export class UsersModule {}
