import { getSynchronizedDate } from './compute-offset';

type SyncedNowParams = {
  offsetMs: number | null;
  hasSyncedOnce: boolean;
};

const getSyncedNow = ({
  offsetMs,
  hasSyncedOnce,
}: SyncedNowParams): Date => {
  if (offsetMs !== null && hasSyncedOnce) {
    return getSynchronizedDate(offsetMs);
  }

  return new Date();
};

export { getSyncedNow };
