import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterRequest, RegisterResponse } from './dto/register.dto';
import { LoginRequest, LoginResponse } from './dto/login.dto';
import type { Request, Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiBody({ type: LoginRequest })
  @ApiOkResponse({ description: 'Успешный вход', type: LoginResponse })
  @ApiBadRequestResponse({ description: 'Неверные данные запроса' })
  @ApiUnauthorizedResponse({ description: 'Неверные учётные данные' })
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: LoginRequest,
  ) {
    return await this.authService.login(res, dto);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiBody({ type: RegisterRequest })
  @ApiCreatedResponse({
    description: 'Пользователь создан',
    type: RegisterResponse,
  })
  @ApiBadRequestResponse({ description: 'Неверные данные запроса' })
  async register(
    @Res({ passthrough: true }) res: Response,
    @Body() dto: RegisterRequest,
  ) {
    return await this.authService.register(res, dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Обновление access токена по refresh куке' })
  @ApiOkResponse({ description: 'Токен обновлён' })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.authService.refresh(res, req);
  }
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Выход и очистка refresh куки' })
  @ApiOkResponse({ description: 'Успешный выход' })
  async logout(@Res({ passthrough: true }) res: Response) {
    return await this.authService.logout(res);
  }
}
