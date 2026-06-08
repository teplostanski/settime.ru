import type { RootState } from '../../store';

export const selectTimeZone = (state: RootState): string =>
  state.timezone.timeZone;
