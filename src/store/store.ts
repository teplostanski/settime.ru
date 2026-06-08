import { configureStore } from '@reduxjs/toolkit';
import { wsMiddleware } from './features/time';
import { rootReducer } from './root-reducer';

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(wsMiddleware),
  });

type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
