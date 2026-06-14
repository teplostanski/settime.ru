import { SyncPhase, type Phase } from '../../shared/sync-phase';
import { IndicatorVariant, type Variant } from './indicator-variant';

const deriveIndicatorVariant = (phase: Phase): Variant => {
  if (phase === SyncPhase.Synced || phase === SyncPhase.Degraded) {
    return IndicatorVariant.Synced;
  }

  if (phase === SyncPhase.Syncing) {
    return IndicatorVariant.Syncing;
  }

  return IndicatorVariant.Offline;
};

export { deriveIndicatorVariant };
