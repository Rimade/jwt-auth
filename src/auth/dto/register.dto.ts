import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterRequest {
  @ApiProperty({
    example: 'Иван Иванов',
    description: 'Имя пользователя',
    maxLength: 50,
  })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя не должно быть пустым' })
  @MaxLength(50, { message: 'Имя не должно превышать 50 символов' })
  name: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty({ message: 'Email не должен быть пустым' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Пароль пользователя (от 6 до 100 символов)',
    minLength: 6,
    maxLength: 100,
  })
  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  @MaxLength(100, { message: 'Пароль не должен превышать 100 символов' })
  password: string;

  @ApiPropertyOptional({
    example: '+79991234567',
    description: 'Телефон пользователя (опционально, только для РФ)',
    maxLength: 20,
  })
  @IsOptional()
  @IsString({ message: 'Телефон должен быть строкой' })
  @IsPhoneNumber('RU', { message: 'Некорректный номер телефона' })
  @MaxLength(20, { message: 'Телефон не должен превышать 20 символов' })
  phone?: string;
}

export class RegisterResponse {
  @ApiProperty({
    example: 1,
    description: 'ID пользователя',
    required: false,
  })
  id?: number;

  @ApiProperty({
    example: 'Иван Иванов',
    description: 'Имя пользователя',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
    required: false,
  })
  email?: string;

  @ApiPropertyOptional({
    example: '+79991234567',
    description: 'Телефон пользователя',
  })
  phone?: string;

  @ApiPropertyOptional({
    example: 'Пользователь успешно зарегистрирован',
    description: 'Сообщение о результате регистрации',
  })
  message?: string;
}
