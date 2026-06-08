import { dayjs } from "../dayjs";

export const getMsUntilNextMidnight = (at: Date, timeZone: string): number => {
  const zonedNow = dayjs(at).tz(timeZone);
  const nextMidnight = zonedNow.add(1, 'day').startOf('day');
  return Math.max(nextMidnight.diff(zonedNow), 1);
};