type Stop = () => void;

const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;

const msUntilNextSecond = (): number => {
  const now = new Date();
  return MS_PER_SECOND - now.getMilliseconds();
};

const msUntilNextMinute = (): number => {
  const now = new Date();
  return (
    (SECONDS_PER_MINUTE - now.getSeconds()) * MS_PER_SECOND -
    now.getMilliseconds()
  );
};

/** Миллисекунды до следующей полуночи по локальному календарю. */
const msUntilLocalMidnight = (from: Date): number => {
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

const msUntilNextLocalMidnight = (): number =>
  msUntilLocalMidnight(new Date());

const scheduleAlignedTick = (
  onTick: () => void,
  msUntilNext: () => number,
): Stop => {
  let timeoutId: ReturnType<typeof setTimeout>;
  let cancelled = false;

  const schedule = () => {
    timeoutId = setTimeout(() => {
      if (cancelled) return;
      onTick();
      schedule();
    }, msUntilNext());
  };

  schedule();

  return () => {
    cancelled = true;
    clearTimeout(timeoutId);
  };
};

export {
  msUntilNextLocalMidnight,
  msUntilNextMinute,
  msUntilNextSecond,
  scheduleAlignedTick,
};
