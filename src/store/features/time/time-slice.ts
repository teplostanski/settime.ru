import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { AsyncStatus, type Status } from '../../../shared/async-status';
import { DEFAULT_SYNC_ERROR_MESSAGE } from '../../../shared/time/sync-messages';

type TimeState = {
  offsetMs: number | null;
  status: Status;
  hasSyncedOnce: boolean;
  error: string | null;
};

const initialState: TimeState = {
  offsetMs: null,
  status: AsyncStatus.Idle,
  hasSyncedOnce: false,
  error: null,
};

const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    timeSyncStarted(state) {
      state.status = AsyncStatus.Loading;
      state.error = null;
    },
    timeSyncSucceeded(state, action: PayloadAction<number>) {
      state.offsetMs = action.payload;
      state.hasSyncedOnce = true;
      state.status = AsyncStatus.Succeeded;
      state.error = null;
    },
    timeSyncFailed(state, action: PayloadAction<string | undefined>) {
      if (!state.hasSyncedOnce) {
        state.status = AsyncStatus.Failed;
      }

      state.error = action.payload ?? DEFAULT_SYNC_ERROR_MESSAGE;
    },
  },
});

export const { timeSyncFailed, timeSyncStarted, timeSyncSucceeded } =
  timeSlice.actions;
export const timeReducer = timeSlice.reducer;
