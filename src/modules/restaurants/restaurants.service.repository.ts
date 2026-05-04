import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './models/entities/restaurant.entity';

@Injectable()
export class RestaurantsRepository {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findByIdWithMenu(id: string): Promise<Restaurant | null> {
    return this.restaurantRepository.findOne({
      where: { id },
      relations: { menuItems: true },
      order: { menuItems: { name: 'ASC' } },
    });
  }
}
