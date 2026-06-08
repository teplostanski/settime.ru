type TimezoneOption = {
  id: string;
  label: string;
};

const TIMEZONE_OPTIONS: readonly TimezoneOption[] = [
  { id: 'Europe/Moscow', label: 'Москва, Россия' },
  { id: 'Europe/Kaliningrad', label: 'Калининград, Россия' },
  { id: 'Asia/Yekaterinburg', label: 'Екатеринбург, Россия' },
  { id: 'Asia/Novosibirsk', label: 'Новосибирск, Россия' },
  { id: 'Asia/Vladivostok', label: 'Владивосток, Россия' },
  { id: 'Europe/London', label: 'Лондон, Великобритания' },
  { id: 'Europe/Berlin', label: 'Берлин, Германия' },
  { id: 'America/New_York', label: 'Нью-Йорк, США' },
  { id: 'Asia/Tokyo', label: 'Токио, Япония' },
  { id: 'Etc/UTC', label: 'UTC' },
] as const;

const getBrowserTimeZone = (): string =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

const getTimezoneLabel = (timeZone: string): string =>
  TIMEZONE_OPTIONS.find((option) => option.id === timeZone)?.label ?? timeZone;

const getTimezoneOptions = (currentTimeZone: string): readonly TimezoneOption[] => {
  if (TIMEZONE_OPTIONS.some((option) => option.id === currentTimeZone)) {
    return TIMEZONE_OPTIONS;
  }

  return [{ id: currentTimeZone, label: currentTimeZone }, ...TIMEZONE_OPTIONS];
};

export {
  getBrowserTimeZone,
  getTimezoneLabel,
  getTimezoneOptions,
};
export type { TimezoneOption };
