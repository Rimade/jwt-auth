import { ConfigService } from '@nestjs/config';

/**
 * Проверяет, находится ли приложение в режиме разработки.
 * Возвращает true, если NODE_ENV установлен в 'development'.
 */
export const isDev = (configService: ConfigService): boolean =>
  configService.getOrThrow('NODE_ENV') === 'development';
