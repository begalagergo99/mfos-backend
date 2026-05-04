import { ApiProperty } from '@nestjs/swagger';

export class MenuItemDto {
  @ApiProperty({
    description: 'Unique identifier of the menu item',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  id!: string;

  @ApiProperty({
    description: 'Name of the menu item',
    example: 'Margherita Pizza',
  })
  name!: string;

  @ApiProperty({
    description: 'Description of the menu item',
    example: 'Classic tomato sauce with mozzarella cheese',
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    description: 'Price of the menu item in the smallest currency unit (e.g. cents)',
    example: 1299,
  })
  price!: number;

  @ApiProperty({
    description: 'Whether the menu item is currently available to order',
    example: true,
  })
  isAvailable!: boolean;
}
