import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './models/dto/login.dto';
import { RegisterDto } from './models/dto/register.dto';
import { UserDto } from './models/dto/auth-response.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { JwtPayload } from '../../common/types/jwt-payload.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(
      registerDto.name,
      registerDto.email,
      registerDto.password,
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto.email, loginDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('who-am-i')
  async getCurrentUser(@CurrentUser() currentUser: JwtPayload): Promise<UserDto> {
    return await this.authService.getProfile(currentUser.sub);
  }
}
