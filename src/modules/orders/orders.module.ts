import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './models/entities/order.entity';
import { OrderItem } from './models/entities/order-item.entity';
import { Restaurant } from '../restaurants/models/entities/restaurant.entity';
import { MenuItem } from '../restaurants/models/entities/menu-item.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order,OrderItem, Restaurant, MenuItem])],
    controllers: [],
    providers: [],
})
export class OrdersModule {}
