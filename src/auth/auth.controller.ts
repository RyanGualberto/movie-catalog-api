import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CreateAuthDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: Object,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: LoginAuthDto,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: Object,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return await this.authService.login(loginAuthDto);
  }
}
