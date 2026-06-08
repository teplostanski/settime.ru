import type { RootState } from '../../store';
import { deriveSyncPhase } from '../../../shared/time/derive-sync-phase';

const selectTimeState = (state: RootState) => state.time;

export const selectSyncPhase = (state: RootState) =>
  deriveSyncPhase(selectTimeState(state));

export const selectTimeStatus = (state: RootState) =>
  selectTimeState(state).status;

export const selectHasSyncedOnce = (state: RootState) =>
  selectTimeState(state).hasSyncedOnce;

export const selectOffsetMs = (state: RootState) =>
  selectTimeState(state).offsetMs;

export const selectTimeError = (state: RootState) =>
  selectTimeState(state).error;
