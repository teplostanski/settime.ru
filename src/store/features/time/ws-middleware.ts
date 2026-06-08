import type { Middleware } from '@reduxjs/toolkit';
import { TIME_SERVER_WS_URL } from '../../../shared/config/time-server';
import { computeOffsetMs } from '../../../shared/time/compute-offset';
import { parseTimeMessage } from '../../../shared/time/time-message';
import type { RootState } from '../../store';
import {
  timeSyncFailed,
  timeSyncStarted,
  timeSyncSucceeded,
} from './time-slice';

const WS_URL = TIME_SERVER_WS_URL;
const RESYNC_INTERVAL_MS = 30 * 60 * 1000;
const RETRY_AFTER_FAIL_MS = 1000;

const wsMiddleware: Middleware<object, RootState> = (store) => {
  let ws: WebSocket | null = null;

  const connect = () => {
    ws?.close();
    ws = null;

    const { hasSyncedOnce } = store.getState().time;

    if (!hasSyncedOnce) {
      store.dispatch(timeSyncStarted());
    }

    const socket = new WebSocket(WS_URL);
    ws = socket;
    let receivedTime = false;

    socket.onmessage = (event) => {
      try {
        const data = parseTimeMessage(JSON.parse(String(event.data)));

        if (!data) {
          store.dispatch(timeSyncFailed('Пришёл странный ответ сервера.'));
          return;
        }

        receivedTime = true;
        store.dispatch(
          timeSyncSucceeded(computeOffsetMs(data.value, Date.now())),
        );
      } catch {
        store.dispatch(timeSyncFailed('Пришёл странный ответ сервера.'));
      }
    };

    socket.onerror = () => {
      if (!receivedTime) {
        store.dispatch(
          timeSyncFailed('Не удалось подключиться к серверу времени.'),
        );
      }
    };

    socket.onclose = () => {
      if (!receivedTime) {
        store.dispatch(
          timeSyncFailed('Соединение с сервером времени закрыто.'),
        );
      }
    };
  };

  setTimeout(() => {
    connect();
  }, 0);
  setInterval(connect, RESYNC_INTERVAL_MS);

  return (next) => (action) => {
    const result = next(action);

    if (timeSyncFailed.match(action) && !store.getState().time.hasSyncedOnce) {
      setTimeout(connect, RETRY_AFTER_FAIL_MS);
    }

    return result;
  };
};

export { wsMiddleware };
