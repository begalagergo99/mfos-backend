import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'UUID of the menu item' })
  @IsUUID()
  menuItemId!: string;

  @ApiProperty({ example: 2, description: 'Quantity to order, minimum 1' })
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440001', description: 'UUID of the restaurant' })
  @IsUUID()
  restaurantId!: string;

  @ApiProperty({ type: [CreateOrderItemDto], description: 'Non-empty list of items to order' })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}
