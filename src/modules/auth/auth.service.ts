import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/entities/user.entity';
import { UserDto } from './models/dto/auth-response.dto';
import { toUserDto } from '../users/models/mappings/user.mapping';
import { JwtPayload } from '../../common/types/jwt-payload.type';

type AuthResponse = {
  accessToken: string;
  user: UserDto;
};

const BCRYPT_SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<UserDto> {
    try {
      const normalizedEmail = this.normalizeEmail(email);
      const normalizedName = this.normalizeName(name);

      const existingUser = await this.usersService.findByEmail(normalizedEmail);
      if (existingUser) {
        throw new ConflictException('Email is already in use');
      }

      const passwordHash = await this.hashPassword(password);
      const newUser = await this.usersService.createUser(
        normalizedName,
        normalizedEmail,
        passwordHash,
      );

      return toUserDto(newUser);
    } catch (error) {
      if (error instanceof ConflictException) throw error;
      throw new InternalServerErrorException('Registration failed');
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const normalizedEmail = this.normalizeEmail(email);

      const existingUser = await this.usersService.findByEmail(normalizedEmail);
      if (!existingUser) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await this.validatePassword(
        password,
        existingUser.passwordHash,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return this.buildAuthResponse(existingUser);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Login failed');
    }
  }

  async getProfile(userId: string): Promise<UserDto> {
    try {
      const user = await this.usersService.findById(userId);
      if (!user) {
        throw new UnauthorizedException();
      }
      return toUserDto(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException('Failed to fetch profile');
    }
  }

  private buildAuthResponse(user: User): AuthResponse {
    const accessToken = this.signAccessToken(user);
    return { accessToken, user: toUserDto(user) };
  }

  private signAccessToken(user: User): string {
    const userPayload: JwtPayload = { sub: user.id, email: user.email };
    return this.jwtService.sign(userPayload);
  }

  private async validatePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, passwordHash);
    } catch {
      throw new InternalServerErrorException('Failed to validate password');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
    } catch {
      throw new InternalServerErrorException('Failed to hash password');
    }
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private normalizeName(name: string): string {
    return name.trim();
  }
}
