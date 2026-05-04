import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantsRepository } from './restaurants.service.repository';
import { RestaurantDetailsDto, RestaurantListItemDto } from './models/dto/restaurant.dto';
import {
  toRestaurantDetailsDto,
  toRestaurantListItemDto,
} from './models/mappings/restaurant.mapping';

@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantsRepository: RestaurantsRepository) {}

  async findAll(): Promise<RestaurantListItemDto[]> {
    const restaurants = await this.restaurantsRepository.findAll();
    return restaurants.map(toRestaurantListItemDto);
  }

  async findById(id: string): Promise<RestaurantDetailsDto> {
    const restaurant = await this.restaurantsRepository.findByIdWithMenu(id);
    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }
    return toRestaurantDetailsDto(restaurant);
  }
}
