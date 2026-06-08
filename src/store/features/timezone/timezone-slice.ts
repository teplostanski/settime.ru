import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getBrowserTimeZone } from '../../../shared/time/timezones';

type TimezoneState = {
  timeZone: string;
};

const initialState: TimezoneState = {
  timeZone: getBrowserTimeZone(),
};

const timezoneSlice = createSlice({
  name: 'timezone',
  initialState,
  reducers: {
    setTimeZone: (state, action: PayloadAction<string>) => {
      state.timeZone = action.payload;
    },
  },
});

export const { setTimeZone } = timezoneSlice.actions;
export const timezoneReducer = timezoneSlice.reducer;
