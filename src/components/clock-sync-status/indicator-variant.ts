import type { ValueOf } from '../../shared/types';

export const IndicatorVariant = {
  Offline: 'offline',
  Synced: 'synced',
  Syncing: 'syncing',
} as const;

export type Variant = ValueOf<typeof IndicatorVariant>;
