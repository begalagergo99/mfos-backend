import { ApiProperty } from '@nestjs/swagger';
import { MenuItemDto } from './menu-item.dto';

export class RestaurantListItemDto {
  @ApiProperty({
    description: 'Unique identifier of the restaurant',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  id!: string;

  @ApiProperty({
    description: 'Name of the restaurant',
    example: 'Pizza Palace',
  })
  name!: string;

  @ApiProperty({
    description: 'Short description of the restaurant',
    example: 'Authentic Italian pizzas and pastas',
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    description: 'Physical address of the restaurant',
    example: '123 Main Street, Springfield',
    nullable: true,
  })
  address!: string | null;
}

export class RestaurantDetailsDto extends RestaurantListItemDto {
  @ApiProperty({
    description: 'List of menu items offered by this restaurant',
    type: [MenuItemDto],
  })
  menuItems!: MenuItemDto[];
}
