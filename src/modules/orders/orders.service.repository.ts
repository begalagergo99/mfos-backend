import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MenuItem } from '../restaurants/models/entities/menu-item.entity';
import { Restaurant } from '../restaurants/models/entities/restaurant.entity';
import { Order } from './models/entities/order.entity';
import { OrderItem } from './models/entities/order-item.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
  ) {}

  async findRestaurantById(restaurantId: string): Promise<Restaurant | null> {
    return this.restaurantRepository.findOne({ where: { id: restaurantId } });
  }

  async findMenuItemsByIds(menuItemIds: string[]): Promise<MenuItem[]> {
    return this.menuItemRepository.find({
      where: { id: In(menuItemIds) },
      relations: { restaurant: true },
    });
  }

  createOrder(orderData: Partial<Order>): Order {
    return this.orderRepository.create(orderData);
  }

  async saveOrder(order: Order): Promise<Order> {
    return this.orderRepository.save(order);
  }

  async findOrderByIdForUser(orderId: string, userId: string): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id: orderId, user: { id: userId } },
      relations: { restaurant: true, items: true },
    });
  }
}
