import cn from 'classnames';
import { SyncPhase } from '../../shared/sync-phase';
import {
  formatTimeOffset,
  getTimeOffsetCaption,
} from '../../shared/time/format-time-offset';
import { SyncErrorMessage } from '../../shared/time/sync-error-messages';
import {
  selectOffsetMs,
  selectSyncPhase,
  selectTimeError,
} from '../../store/features/time';
import { useAppSelector } from '../../store/hooks';
import styles from './clock-sync-status.module.css';
import { deriveIndicatorVariant } from './derive-indicator-variant';
import { IndicatorVariant } from './indicator-variant';

const indicatorClassName = {
  [IndicatorVariant.Offline]: styles.indicatorOffline,
  [IndicatorVariant.Synced]: styles.indicatorSynced,
  [IndicatorVariant.Syncing]: styles.indicatorSyncing,
} as const;

const ClockSyncStatus = () => {
  const phase = useAppSelector(selectSyncPhase);
  const offsetMs = useAppSelector(selectOffsetMs);
  const error = useAppSelector(selectTimeError);
  const indicatorVariant = deriveIndicatorVariant(phase);

  const indicator = (
    <span
      className={cn(styles.indicator, indicatorClassName[indicatorVariant])}
      aria-hidden="true"
    />
  );

  if (phase === SyncPhase.Failed) {
    return (
      <div className={styles.root}>
        <p className={styles.error} role="alert" aria-live="assertive">
          {error ?? SyncErrorMessage.Default}
        </p>
        {indicator}
      </div>
    );
  }

  if (phase === SyncPhase.Initial || phase === SyncPhase.Syncing) {
    return (
      <div className={styles.root}>
        <p className={styles.loading} role="status" aria-live="polite" />
        {indicator}
      </div>
    );
  }

  if (offsetMs === null) {
    return <div className={styles.root}>{indicator}</div>;
  }

  if (phase === SyncPhase.Degraded) {
    return (
      <div className={styles.root}>
        <p className={styles.warning} role="status" aria-live="polite">
          {error ?? SyncErrorMessage.Default}
          {' · '}
          {getTimeOffsetCaption(offsetMs)} {formatTimeOffset(offsetMs)}
        </p>
        {indicator}
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <p className={styles.synced} aria-live="polite">
        {getTimeOffsetCaption(offsetMs)} {formatTimeOffset(offsetMs)}
      </p>
      {indicator}
    </div>
  );
};

export { ClockSyncStatus };
