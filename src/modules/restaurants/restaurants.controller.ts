import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RestaurantsService } from './restaurants.service';
import { RestaurantDetailsDto, RestaurantListItemDto } from './models/dto/restaurant.dto';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  @ApiOperation({ summary: 'List all restaurants' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all restaurants.',
    type: [RestaurantListItemDto],
  })
  findAll(): Promise<RestaurantListItemDto[]> {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get restaurant details including its menu' })
  @ApiResponse({
    status: 200,
    description: 'Returns the restaurant with its full menu.',
    type: RestaurantDetailsDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid UUID format.' })
  @ApiResponse({ status: 404, description: 'Restaurant not found.' })
  findById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<RestaurantDetailsDto> {
    return this.restaurantsService.findById(id);
  }
}
