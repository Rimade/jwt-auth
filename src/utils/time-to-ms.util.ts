/**
 * Утилита для конвертации времени в дату истечения (Date).
 * Принимает строку формата '2h', '7d', '30m', '15s' и т.д.
 * @param timeStr - строка с числом и суффиксом ('s', 'm', 'h', 'd')
 * @returns объект Date, соответствующий текущему времени + указанное смещение
 */
export const timeToMs = (timeStr: string): Date => {
  const match = /^(\d+)([smhd])$/.exec(timeStr.trim());
  if (!match) {
    throw new Error(
      'Неверный формат времени. Ожидается, например: "2h", "7d", "30m", "15s"',
    );
  }
  const value = parseInt(match[1], 10);
  const unit = match[2];

  let ms: number;
  switch (unit) {
    case 's':
      ms = value * 1000;
      break;
    case 'm':
      ms = value * 60 * 1000;
      break;
    case 'h':
      ms = value * 60 * 60 * 1000;
      break;
    case 'd':
      ms = value * 24 * 60 * 60 * 1000;
      break;
    default:
      throw new Error('Неизвестная единица измерения времени');
  }
  return new Date(Date.now() + ms);
};
