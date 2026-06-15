import { dayjs } from '../dayjs';

type Unit = 'day' | 'minute' | 'second';

const MIN_TIMER_DELAY_MS = 1;

const getMsUntilNextBoundary = (
  unit: Unit,
  at: Date,
  timeZone: string,
): number => {
  const zonedNow = dayjs(at).tz(timeZone);
  const nextBoundary = zonedNow.startOf(unit).add(1, unit);
  return Math.max(nextBoundary.diff(zonedNow), MIN_TIMER_DELAY_MS);
};

export const getMsUntilNextMidnight = (at: Date, timeZone: string): number =>
  getMsUntilNextBoundary('day', at, timeZone);

export const getMsUntilNextMinute = (at: Date, timeZone: string): number =>
  getMsUntilNextBoundary('minute', at, timeZone);

export const getMsUntilNextSecond = (at: Date, timeZone: string): number =>
  getMsUntilNextBoundary('second', at, timeZone);
