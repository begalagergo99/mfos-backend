import { Order } from '../entities/order.entity';
import {
  CreateOrderResponseDto,
  OrderDetailsDto,
  OrderItemDto,
  OrderRestaurantDto,
} from '../dto/order.dto';

export function toCreateOrderResponseDto(order: Order): CreateOrderResponseDto {
  return {
    id: order.id,
    status: order.status,
    totalPrice: order.totalPrice,
  };
}

export function toOrderDetailsDto(order: Order): OrderDetailsDto {
  const restaurant: OrderRestaurantDto = {
    id: order.restaurant.id,
    name: order.restaurant.name,
  };

  const items: OrderItemDto[] = order.items.map((item) => ({
    id: item.id,
    name: item.nameSnapshot,
    price: item.priceSnapshot,
    quantity: item.quantity,
  }));

  return {
    id: order.id,
    status: order.status,
    totalPrice: order.totalPrice,
    createdAt: order.createdAt,
    restaurant,
    items,
  };
}
