import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './models/entities/restaurant.entity';
import { MenuItem } from './models/entities/menu-item.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MenuItem, Restaurant])],
    controllers: [],
    providers: [],
})
export class RestaurantsModule {}
