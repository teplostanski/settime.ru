import { useEffect, useState } from 'react';
import { dayjs } from '../dayjs';
import { getSyncedNow } from '../time/get-synced-now';
import { useAppSelector } from '../../store/hooks';
import { selectHasSyncedOnce, selectOffsetMs } from '../../store/features/time';
import {
  getMsUntilNextMidnight,
  getMsUntilNextMinute,
  getMsUntilNextSecond,
} from '../time/get-ms-until-next-boundary';

/*
TODO: Подумать об одном таймере вместо отдельных на каждый вызов хука
*/
const useSyncedNowSecond = (timeZone: string): Date => {
  const offsetMs = useAppSelector(selectOffsetMs);
  const hasSyncedOnce = useAppSelector(selectHasSyncedOnce);
  const [now, setNow] = useState(() =>
    getSyncedNow({ offsetMs, hasSyncedOnce }),
  );

  useEffect(() => {
    let timerId: number;

    const schedule = () => {
      const current = getSyncedNow({ offsetMs, hasSyncedOnce });
      setNow(dayjs(current).tz(timeZone).startOf('second').toDate());
      const delay = getMsUntilNextSecond(current, timeZone);
      timerId = setTimeout(schedule, delay);
    };

    schedule();

    return () => clearTimeout(timerId);
  }, [hasSyncedOnce, offsetMs, timeZone]);

  return now;
};

const useSyncedNowMinute = (timeZone: string): Date => {
  const offsetMs = useAppSelector(selectOffsetMs);
  const hasSyncedOnce = useAppSelector(selectHasSyncedOnce);
  const [now, setNow] = useState(() =>
    getSyncedNow({ offsetMs, hasSyncedOnce }),
  );

  useEffect(() => {
    let timerId: number;

    const schedule = () => {
      const current = getSyncedNow({ offsetMs, hasSyncedOnce });
      setNow(dayjs(current).tz(timeZone).startOf('minute').toDate());
      const delay = getMsUntilNextMinute(current, timeZone);
      timerId = setTimeout(schedule, delay);
    };

    schedule();

    return () => clearTimeout(timerId);
  }, [hasSyncedOnce, offsetMs, timeZone]);

  return now;
};

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
      setNow(dayjs(current).tz(timeZone).startOf('day').toDate());
      const delay = getMsUntilNextMidnight(current, timeZone);
      timerId = setTimeout(schedule, delay);
    };

    schedule();

    return () => clearTimeout(timerId);
  }, [hasSyncedOnce, offsetMs, timeZone]);

  return now;
};

export { useSyncedNowMidnight, useSyncedNowMinute, useSyncedNowSecond };
