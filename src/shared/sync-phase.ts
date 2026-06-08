import type { ValueOf } from './types';

export const SyncPhase = {
  Degraded: 'degraded',
  Failed: 'failed',
  Initial: 'initial',
  Synced: 'synced',
  Syncing: 'syncing',
} as const;

export type Phase = ValueOf<typeof SyncPhase>;
