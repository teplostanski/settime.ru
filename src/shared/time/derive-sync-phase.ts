import { AsyncStatus, type Status } from '../async-status';
import { SyncPhase, type Phase } from '../sync-phase';

type SyncPhaseParams = {
  error: string | null;
  hasSyncedOnce: boolean;
  offsetMs: number | null;
  status: Status;
};

const deriveSyncPhase = ({
  error,
  hasSyncedOnce,
  offsetMs,
  status,
}: SyncPhaseParams): Phase => {
  if (!hasSyncedOnce) {
    if (status === AsyncStatus.Failed) {
      return SyncPhase.Failed;
    }

    if (status === AsyncStatus.Loading) {
      return SyncPhase.Syncing;
    }

    return SyncPhase.Initial;
  }

  if (error !== null) {
    return SyncPhase.Degraded;
  }

  if (offsetMs !== null) {
    return SyncPhase.Synced;
  }

  return SyncPhase.Syncing;
};

export { deriveSyncPhase };
