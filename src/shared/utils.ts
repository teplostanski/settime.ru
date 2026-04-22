export const padZero = (unit: number) => {
  if (unit < 10) {
    return `0${unit}`;
  }

  return String(unit);
};

/** Миллисекунды до следующей полуночи по локальному календарю. */
export const msUntilLocalMidnight = (from: Date): number => {
  const next = new Date(
    from.getFullYear(),
    from.getMonth(),
    from.getDate() + 1,
    0,
    0,
    0,
    0,
  );
  return Math.max(1, next.getTime() - from.getTime());
};