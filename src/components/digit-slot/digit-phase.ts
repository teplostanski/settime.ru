import type { ValueOf } from '../../shared/types';

export const DigitPhase = {
  Entering: 'entering',
  Exiting: 'exiting',
  Idle: 'idle',
} as const;

export type Phase = ValueOf<typeof DigitPhase>;
