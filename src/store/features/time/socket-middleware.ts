import type { Middleware } from '@reduxjs/toolkit';
import { TIME_SERVER_WS_URL } from '../../../shared/config/time-server';
import {
  MS_PER_SECOND,
  RETRY_AFTER_FAIL_MS,
} from '../../../shared/time/time-constants';
import { computeOffsetMs } from '../../../shared/time/compute-offset';
import { SyncErrorMessage } from '../../../shared/time/sync-error-messages';
import type { TimeMessage } from '../../../shared/time/time-message';
import type { RootState } from '../../store';
import {
  timeSyncFailed,
  timeSyncStarted,
  timeSyncSucceeded,
} from './time-slice';
import { createSocket } from './create-socket';

const REFRESH_INTERVAL_MS = 30 * 60 * MS_PER_SECOND;

const socketMiddleware: Middleware<object, RootState> = (store) => {
  const hasSyncedOnce = () => store.getState().time.hasSyncedOnce;

  const fail = (message: string) => {
    store.dispatch(timeSyncFailed(message));
  };

  const recoverOrFail = (recover: () => void, message: string) => {
    if (hasSyncedOnce()) {
      recover();
      return;
    }

    fail(message);
  };

  const handleData = (data: TimeMessage) => {
    store.dispatch(
      timeSyncSucceeded(computeOffsetMs(data.value, Date.now())),
    );
  };

  const handleInvalidData = () => {
    recoverOrFail(() => socket.refreshData(), SyncErrorMessage.InvalidTime);
  };

  const handleConnectionError = () => {
    recoverOrFail(() => socket.connect(), SyncErrorMessage.ConnectionError);
  };

  const handleClose = () => {
    recoverOrFail(() => socket.connect(), SyncErrorMessage.ConnectionClosed);
  };

  const socket = createSocket({
    url: TIME_SERVER_WS_URL,
    onData: handleData,
    onInvalidData: handleInvalidData,
    onConnectionError: handleConnectionError,
    onClose: handleClose,
  });

  const repeatRefresh = () => {
    setTimeout(() => {
      socket.refreshData();
      repeatRefresh();
    }, REFRESH_INTERVAL_MS);
  };

  const startConnect = () => {
    store.dispatch(timeSyncStarted());
    socket.connect();
  };

  setTimeout(() => {
    startConnect();
    repeatRefresh();
  }, 0);

  return (next) => (action) => {
    const result = next(action);

    if (timeSyncFailed.match(action) && !hasSyncedOnce()) {
      setTimeout(startConnect, RETRY_AFTER_FAIL_MS);
    }

    return result;
  };
};

export { socketMiddleware };
