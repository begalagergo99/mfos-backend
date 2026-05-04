import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MenuItem } from '../restaurants/models/entities/menu-item.entity';
import { OrderItem } from './models/entities/order-item.entity';
import { CreateOrderDto, CreateOrderItemDto } from './models/dto/create-order.dto';
import { CreateOrderResponseDto, OrderDetailsDto } from './models/dto/order.dto';
import {
  toCreateOrderResponseDto,
  toOrderDetailsDto,
} from './models/mappings/order.mapping';
import { OrdersRepository } from './orders.service.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async createOrder(
    userId: string,
    createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    const restaurant = await this.ordersRepository.findRestaurantById(
      createOrderDto.restaurantId,
    );
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const requestedMenuItemIds = this.getRequestedMenuItemIds(createOrderDto.items);
    const foundMenuItems = await this.ordersRepository.findMenuItemsByIds(requestedMenuItemIds);

    this.validateMenuItems(foundMenuItems, requestedMenuItemIds, createOrderDto.restaurantId);

    const orderItems = this.buildOrderItems(createOrderDto.items, foundMenuItems);
    const totalPrice = this.calculateTotalPrice(createOrderDto.items, foundMenuItems);

    const newOrder = this.ordersRepository.createOrder({
      user: { id: userId } as any,
      restaurant,
      totalPrice,
      items: orderItems as any,
    });

    const savedOrder = await this.ordersRepository.saveOrder(newOrder);
    return toCreateOrderResponseDto(savedOrder);
  }

  async findByIdForUser(
    orderId: string,
    userId: string,
  ): Promise<OrderDetailsDto> {
    const order = await this.ordersRepository.findOrderByIdForUser(orderId, userId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return toOrderDetailsDto(order);
  }

  private getRequestedMenuItemIds(items: CreateOrderItemDto[]): string[] {
    return items.map((item) => item.menuItemId);
  }

  private validateMenuItems(
    foundMenuItems: MenuItem[],
    requestedMenuItemIds: string[],
    restaurantId: string,
  ): void {
    if (foundMenuItems.length !== requestedMenuItemIds.length) {
      throw new BadRequestException('One or more menu items are invalid');
    }

    const menuItemFromWrongRestaurant = foundMenuItems.find(
      (menuItem) => menuItem.restaurant.id !== restaurantId,
    );
    if (menuItemFromWrongRestaurant) {
      throw new BadRequestException(
        'One or more menu items do not belong to the selected restaurant',
      );
    }

    const unavailableMenuItem = foundMenuItems.find(
      (menuItem) => !menuItem.isAvailable,
    );
    if (unavailableMenuItem) {
      throw new BadRequestException('One or more menu items are unavailable');
    }
  }

  private buildOrderItems(
    requestedItems: CreateOrderItemDto[],
    foundMenuItems: MenuItem[],
  ): Partial<OrderItem>[] {
    const menuItemById = new Map(
      foundMenuItems.map((menuItem) => [menuItem.id, menuItem]),
    );

    return requestedItems.map((requestedItem) => {
      const menuItem = menuItemById.get(requestedItem.menuItemId)!;
      return {
        menuItem,
        nameSnapshot: menuItem.name,
        priceSnapshot: menuItem.price,
        quantity: requestedItem.quantity,
      };
    });
  }

  private calculateTotalPrice(
    requestedItems: CreateOrderItemDto[],
    foundMenuItems: MenuItem[],
  ): number {
    const menuItemById = new Map(
      foundMenuItems.map((menuItem) => [menuItem.id, menuItem]),
    );

    return requestedItems.reduce((total, requestedItem) => {
      const menuItem = menuItemById.get(requestedItem.menuItemId)!;
      return total + menuItem.price * requestedItem.quantity;
    }, 0);
  }
}
