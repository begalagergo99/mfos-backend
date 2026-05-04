import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../enums/order-status.enum';

export class CreateOrderResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440002', description: 'UUID of the created order' })
  id!: string;

  @ApiProperty({ enum: OrderStatus, example: OrderStatus.PENDING, description: 'Current status of the order' })
  status!: OrderStatus;

  @ApiProperty({ example: 5980, description: 'Total price in HUF' })
  totalPrice!: number;
}

export class OrderRestaurantDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'UUID of the restaurant' })
  id!: string;

  @ApiProperty({ example: 'Burger House', description: 'Name of the restaurant' })
  name!: string;
}

export class OrderItemDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440003', description: 'UUID of the order item' })
  id!: string;

  @ApiProperty({ example: 'Classic Burger', description: 'Name of the menu item at time of order' })
  name!: string;

  @ApiProperty({ example: 2990, description: 'Price of the menu item in HUF at time of order' })
  price!: number;

  @ApiProperty({ example: 2, description: 'Quantity ordered' })
  quantity!: number;
}

export class OrderSummaryDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440002', description: 'UUID of the order' })
  id!: string;

  @ApiProperty({ enum: OrderStatus, example: OrderStatus.PENDING, description: 'Current status of the order' })
  status!: OrderStatus;

  @ApiProperty({ example: 5980, description: 'Total price in HUF' })
  totalPrice!: number;

  @ApiProperty({ example: '2026-05-04T13:40:29.227Z', description: 'Timestamp when the order was created' })
  createdAt!: Date;

  @ApiProperty({ example: 'Burger House', description: 'Name of the restaurant' })
  restaurantName!: string;
}

export class OrderDetailsDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440002', description: 'UUID of the order' })
  id!: string;

  @ApiProperty({ enum: OrderStatus, example: OrderStatus.PENDING, description: 'Current status of the order' })
  status!: OrderStatus;

  @ApiProperty({ example: 5980, description: 'Total price in HUF' })
  totalPrice!: number;

  @ApiProperty({ example: '2026-05-04T13:40:29.227Z', description: 'Timestamp when the order was created' })
  createdAt!: Date;

  @ApiProperty({ type: OrderRestaurantDto, description: 'Restaurant the order was placed at' })
  restaurant!: OrderRestaurantDto;

  @ApiProperty({ type: [OrderItemDto], description: 'Items included in the order' })
  items!: OrderItemDto[];
}
