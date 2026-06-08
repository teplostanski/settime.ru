import { combineReducers } from '@reduxjs/toolkit';
import { timeReducer } from './features/time';
import { timezoneReducer } from './features/timezone';

export const rootReducer = combineReducers({
  time: timeReducer,
  timezone: timezoneReducer,
});
