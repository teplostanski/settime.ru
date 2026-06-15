import { dayjs } from '../dayjs';

type TimezoneOption = {
  id: string;
  label: string;
};

const TIMEZONE_OPTIONS: readonly TimezoneOption[] = [
  { id: 'Europe/Kaliningrad', label: 'Калининград, Россия' },
  { id: 'Europe/Moscow', label: 'Москва, Россия' },
  { id: 'Europe/Simferopol', label: 'Симферополь, Россия' },
  { id: 'Europe/Kirov', label: 'Киров, Россия' },
  { id: 'Europe/Volgograd', label: 'Волгоград, Россия' },
  { id: 'Europe/Astrakhan', label: 'Астрахань, Россия' },
  { id: 'Europe/Saratov', label: 'Саратов, Россия' },
  { id: 'Europe/Ulyanovsk', label: 'Ульяновск, Россия' },
  { id: 'Europe/Samara', label: 'Самара, Россия' },
  { id: 'Asia/Yekaterinburg', label: 'Екатеринбург, Россия' },
  { id: 'Asia/Omsk', label: 'Омск, Россия' },
  { id: 'Asia/Novosibirsk', label: 'Новосибирск, Россия' },
  { id: 'Asia/Barnaul', label: 'Барнаул, Россия' },
  { id: 'Asia/Tomsk', label: 'Томск, Россия' },
  { id: 'Asia/Novokuznetsk', label: 'Новокузнецк, Россия' },
  { id: 'Asia/Krasnoyarsk', label: 'Красноярск, Россия' },
  { id: 'Asia/Irkutsk', label: 'Иркутск, Россия' },
  { id: 'Asia/Chita', label: 'Чита, Россия' },
  { id: 'Asia/Yakutsk', label: 'Якутск, Россия' },
  { id: 'Asia/Khandyga', label: 'Хандыга, Россия' },
  { id: 'Asia/Vladivostok', label: 'Владивосток, Россия' },
  { id: 'Asia/Ust-Nera', label: 'Усть-Нера, Россия' },
  { id: 'Asia/Magadan', label: 'Магадан, Россия' },
  { id: 'Asia/Sakhalin', label: 'Сахалин, Россия' },
  { id: 'Asia/Srednekolymsk', label: 'Среднеколымск, Россия' },
  { id: 'Asia/Kamchatka', label: 'Камчатка, Россия' },
  { id: 'Asia/Anadyr', label: 'Анадырь, Россия' },

  { id: 'Europe/Minsk', label: 'Минск, Беларусь' },
  { id: 'Europe/Kyiv', label: 'Киев, Украина' },
  { id: 'Europe/Chisinau', label: 'Кишинёв, Молдова' },
  { id: 'Asia/Yerevan', label: 'Ереван, Армения' },
  { id: 'Asia/Baku', label: 'Баку, Азербайджан' },
  { id: 'Asia/Tbilisi', label: 'Тбилиси, Грузия' },
  { id: 'Asia/Almaty', label: 'Алматы, Казахстан' },
  { id: 'Asia/Qostanay', label: 'Костанай, Казахстан' },
  { id: 'Asia/Qyzylorda', label: 'Кызылорда, Казахстан' },
  { id: 'Asia/Aqtobe', label: 'Актобе, Казахстан' },
  { id: 'Asia/Aqtau', label: 'Актау, Казахстан' },
  { id: 'Asia/Atyrau', label: 'Атырау, Казахстан' },
  { id: 'Asia/Oral', label: 'Уральск, Казахстан' },
  { id: 'Asia/Bishkek', label: 'Бишкек, Киргизия' },
  { id: 'Asia/Dushanbe', label: 'Душанбе, Таджикистан' },
  { id: 'Asia/Ashgabat', label: 'Ашхабад, Туркменистан' },
  { id: 'Asia/Tashkent', label: 'Ташкент, Узбекистан' },
  { id: 'Asia/Samarkand', label: 'Самарканд, Узбекистан' },

  { id: 'Etc/UTC', label: 'UTC' },
  { id: 'Europe/London', label: 'Лондон, Великобритания' },
  { id: 'Europe/Paris', label: 'Париж, Франция' },
  { id: 'Europe/Berlin', label: 'Берлин, Германия' },
  { id: 'Europe/Rome', label: 'Рим, Италия' },
  { id: 'Europe/Madrid', label: 'Мадрид, Испания' },
  { id: 'Europe/Amsterdam', label: 'Амстердам, Нидерланды' },
  { id: 'Europe/Warsaw', label: 'Варшава, Польша' },
  { id: 'Europe/Istanbul', label: 'Стамбул, Турция' },
  { id: 'Africa/Cairo', label: 'Каир, Египет' },
  { id: 'Asia/Dubai', label: 'Дубай, ОАЭ' },
  { id: 'Asia/Jerusalem', label: 'Иерусалим, Израиль' },
  { id: 'Asia/Riyadh', label: 'Эр-Рияд, Саудовская Аравия' },
  { id: 'Asia/Kolkata', label: 'Колката, Индия' },
  { id: 'Asia/Bangkok', label: 'Бангкок, Таиланд' },
  { id: 'Asia/Singapore', label: 'Сингапур' },
  { id: 'Asia/Hong_Kong', label: 'Гонконг' },
  { id: 'Asia/Shanghai', label: 'Шанхай, Китай' },
  { id: 'Asia/Tokyo', label: 'Токио, Япония' },
  { id: 'Asia/Seoul', label: 'Сеул, Южная Корея' },
  { id: 'Australia/Sydney', label: 'Сидней, Австралия' },
  { id: 'Australia/Melbourne', label: 'Мельбурн, Австралия' },
  { id: 'Pacific/Auckland', label: 'Окленд, Новая Зеландия' },
  { id: 'America/Sao_Paulo', label: 'Сан-Паулу, Бразилия' },
  { id: 'America/Mexico_City', label: 'Мехико, Мексика' },
  { id: 'America/New_York', label: 'Нью-Йорк, США' },
  { id: 'America/Chicago', label: 'Чикаго, США' },
  { id: 'America/Denver', label: 'Денвер, США' },
  { id: 'America/Los_Angeles', label: 'Лос-Анджелес, США' },
  { id: 'America/Toronto', label: 'Торонто, Канада' },
  { id: 'America/Vancouver', label: 'Ванкувер, Канада' },
] as const;

const getBrowserTimeZone = (): string => dayjs.tz.guess();

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
