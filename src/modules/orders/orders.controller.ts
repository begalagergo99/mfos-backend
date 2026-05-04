import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import type { JwtPayload } from '../../common/types/jwt-payload.type';
import { CreateOrderDto } from './models/dto/create-order.dto';
import { CreateOrderResponseDto, OrderDetailsDto, OrderSummaryDto } from './models/dto/order.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Create a new order for the authenticated user' })
  @ApiResponse({ status: 201, description: 'Order created successfully.', type: CreateOrderResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid request body.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Restaurant not found.' })
  createOrder(
    @CurrentUser() currentUser: JwtPayload,
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<CreateOrderResponseDto> {
    return this.ordersService.createOrder(currentUser.sub, createOrderDto);
  }

  @Get()
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Get all orders for the authenticated user' })
  @ApiResponse({ status: 200, description: 'Returns all orders for the user.', type: [OrderSummaryDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  findMyOrders(
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<OrderSummaryDto[]> {
    return this.ordersService.findOrdersByUser(currentUser.sub);
  }

  @Get(':id')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Get details of a specific order belonging to the authenticated user' })
  @ApiResponse({ status: 200, description: 'Returns the order details.', type: OrderDetailsDto })
  @ApiResponse({ status: 400, description: 'Invalid UUID format.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  findOrderById(
    @Param('id', ParseUUIDPipe) orderId: string,
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<OrderDetailsDto> {
    return this.ordersService.findByIdForUser(orderId, currentUser.sub);
  }
}
