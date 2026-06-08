import { useEffect, useState } from 'react';
import { getSyncedNow } from '../time/get-synced-now';
import { useAppSelector } from '../../store/hooks';
import { selectHasSyncedOnce, selectOffsetMs } from '../../store/features/time';
import { getMsUntilNextMidnight } from '../time/get-ms-until-next-midnight';

/*
TODO: Подумать об одном таймере вместо отдельных на каждый вызов хука
*/
const useSyncedNow = (intervalMs: number): Date => {
  const offsetMs = useAppSelector(selectOffsetMs);
  const hasSyncedOnce = useAppSelector(selectHasSyncedOnce);
  const [now, setNow] = useState(() =>
    getSyncedNow({ offsetMs, hasSyncedOnce }),
  );

  useEffect(() => {
    const tick = () => setNow(getSyncedNow({ offsetMs, hasSyncedOnce }));

    tick();

    const intervalId = setInterval(tick, intervalMs);

    return () => clearInterval(intervalId);
  }, [hasSyncedOnce, intervalMs, offsetMs]);

  return now;
};

const useSyncedNowSecond = (): Date => useSyncedNow(1000);

const useSyncedNowMinute = (): Date => useSyncedNow(60_000);

const useSyncedNowMidnight = (timeZone: string): Date => {
  const offsetMs = useAppSelector(selectOffsetMs);
  const hasSyncedOnce = useAppSelector(selectHasSyncedOnce);
  const [now, setNow] = useState(() =>
    getSyncedNow({ offsetMs, hasSyncedOnce }),
  );

  useEffect(() => {
    let timerId: number;

    const schedule = () => {
      const current = getSyncedNow({ offsetMs, hasSyncedOnce });
      setNow(current);
      const delay = getMsUntilNextMidnight(current, timeZone);
      timerId = setTimeout(schedule, delay);
    };

    schedule();

    return () => clearTimeout(timerId);
  }, [hasSyncedOnce, offsetMs, timeZone]);

  return now;
};

export { useSyncedNowMidnight, useSyncedNowMinute, useSyncedNowSecond };
