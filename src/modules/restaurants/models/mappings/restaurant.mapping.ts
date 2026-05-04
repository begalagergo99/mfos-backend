import { MenuItem } from '../entities/menu-item.entity';
import { Restaurant } from '../entities/restaurant.entity';
import { MenuItemDto } from '../dto/menu-item.dto';
import { RestaurantDetailsDto, RestaurantListItemDto } from '../dto/restaurant.dto';

export function toMenuItemDto(menuItem: MenuItem): MenuItemDto {
  return {
    id: menuItem.id,
    name: menuItem.name,
    description: menuItem.description,
    price: menuItem.price,
    isAvailable: menuItem.isAvailable,
  };
}

export function toRestaurantListItemDto(restaurant: Restaurant): RestaurantListItemDto {
  return {
    id: restaurant.id,
    name: restaurant.name,
    description: restaurant.description,
    address: restaurant.address,
  };
}

export function toRestaurantDetailsDto(restaurant: Restaurant): RestaurantDetailsDto {
  return {
    id: restaurant.id,
    name: restaurant.name,
    description: restaurant.description,
    address: restaurant.address,
    menuItems: (restaurant.menuItems ?? []).map(toMenuItemDto),
  };
}
