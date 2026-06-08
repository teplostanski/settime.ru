import type { ValueOf } from './types';

export const AsyncStatus = {
  Idle: 'idle',
  Loading: 'loading',
  Succeeded: 'succeeded',
  Failed: 'failed',
} as const;

export type Status = ValueOf<typeof AsyncStatus>;
