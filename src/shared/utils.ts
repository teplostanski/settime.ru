const LOCALE_RU = 'ru-RU';

export const padZero = (unit: number) => {
  if (unit < 10) {
    return `0${unit}`;
  }

  return String(unit);
};

/** Строка даты/времени через Intl (по умолчанию ru-RU). */
export const formatLocaleDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions,
  locale: string = LOCALE_RU,
): string => new Intl.DateTimeFormat(locale, options).format(date);