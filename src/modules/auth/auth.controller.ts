import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './models/dto/login.dto';
import { RegisterDto } from './models/dto/register.dto';
import { AuthResponseDto, UserDto } from './models/dto/auth-response.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/types/jwt-payload.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiResponse({ status: 201, description: 'User registered successfully.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Validation error (invalid email, password too short, etc.).' })
  @ApiResponse({ status: 409, description: 'A user with this email already exists.' })
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(
      registerDto.name,
      registerDto.email,
      registerDto.password,
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Authenticate and receive a JWT token' })
  @ApiResponse({ status: 200, description: 'Login successful. Returns user profile and JWT access token.', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('who-am-i')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Get the currently authenticated user profile' })
  @ApiResponse({ status: 200, description: 'Returns the profile of the JWT-authenticated user.', type: UserDto })
  @ApiResponse({ status: 401, description: 'Missing or invalid JWT token.' })
  async getCurrentUser(@CurrentUser() currentUser: JwtPayload): Promise<UserDto> {
    return await this.authService.getProfile(currentUser.sub);
  }
}
