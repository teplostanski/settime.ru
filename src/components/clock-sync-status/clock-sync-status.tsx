import {
  formatTimeOffset,
  getTimeOffsetCaption,
} from '../../shared/time/format-time-offset';
import { SyncPhase } from '../../shared/sync-phase';
import { DEFAULT_SYNC_ERROR_MESSAGE } from '../../shared/time/sync-messages';
import { useAppSelector } from '../../store/hooks';
import {
  selectOffsetMs,
  selectSyncPhase,
  selectTimeError,
} from '../../store/features/time';
import styles from './clock-sync-status.module.css';

const ClockSyncStatus = () => {
  const phase = useAppSelector(selectSyncPhase);
  const offsetMs = useAppSelector(selectOffsetMs);
  const error = useAppSelector(selectTimeError);

  if (phase === SyncPhase.Failed) {
    return (
      <div className={styles.root}>
        <p className={styles.error} role="alert" aria-live="assertive">
          {error ?? DEFAULT_SYNC_ERROR_MESSAGE}
        </p>
      </div>
    );
  }

  if (phase === SyncPhase.Initial || phase === SyncPhase.Syncing) {
    return (
      <div className={styles.root}>
        <p className={styles.loading} role="status" aria-live="polite">
          <span className={styles.spinner} aria-hidden="true" />
        </p>
      </div>
    );
  }

  if (offsetMs === null) {
    return <div className={styles.root} />;
  }

  if (phase === SyncPhase.Degraded) {
    return (
      <div className={styles.root}>
        <p className={styles.warning} role="status" aria-live="polite">
          {error ?? DEFAULT_SYNC_ERROR_MESSAGE}
          {' · '}
          {getTimeOffsetCaption(offsetMs)} {formatTimeOffset(offsetMs)}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <p className={styles.synced} aria-live="polite">
        {getTimeOffsetCaption(offsetMs)} {formatTimeOffset(offsetMs)}
      </p>
    </div>
  );
};

export { ClockSyncStatus };
