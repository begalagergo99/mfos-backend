import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '../modules/users/models/entities/user.entity';
import { Restaurant } from '../modules/restaurants/models/entities/restaurant.entity';
import { MenuItem } from '../modules/restaurants/models/entities/menu-item.entity';
import { Order } from '../modules/orders/models/entities/order.entity';
import { OrderItem } from '../modules/orders/models/entities/order-item.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Restaurant, MenuItem, Order, OrderItem],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});