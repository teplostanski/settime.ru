import {
  ClientTimeMessage,
  parseTimeMessage,
  type TimeMessage,
} from '../../../shared/time/time-message';

type CreateSocketParams = {
  url: string;
  onData: (event: TimeMessage) => void;
  onInvalidData: () => void;
  onConnectionError: () => void;
  onClose: () => void;
};

type SocketState = { socket: WebSocket | null };

const createSocket = ({
  url,
  onData,
  onInvalidData,
  onConnectionError,
  onClose,
}: CreateSocketParams) => {
  const state: SocketState = { socket: null };

  const close = () => {
    const previousSocket = state.socket;
    state.socket = null;
    previousSocket?.close();
  };

  const connect = () => {
    close();

    const currentSocket = new WebSocket(url);
    state.socket = currentSocket;

    currentSocket.onmessage = (event) => {
      if (state.socket !== currentSocket) {
        return;
      }

      try {
        const data = parseTimeMessage(JSON.parse(String(event.data)));

        if (!data) {
          onInvalidData();
          return;
        }

        onData(data);
      } catch {
        onInvalidData();
      }
    };

    currentSocket.onerror = () => {
      if (state.socket === currentSocket) {
        onConnectionError();
      }
    };

    currentSocket.onclose = () => {
      if (state.socket === currentSocket) {
        onClose();
      }
    };
  };

  const refreshData = () => {
    if (state.socket?.readyState === WebSocket.OPEN) {
      state.socket.send(JSON.stringify(ClientTimeMessage.Refresh));
    }
  };

  return { connect, refreshData };
};

export { createSocket };
export type { CreateSocketParams };
