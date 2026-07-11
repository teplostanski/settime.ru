const DEFAULT_WS_URL = 'ws://localhost:8080/ws';

const TIME_SERVER_WS_URL =
  import.meta.env.VITE_WS_URL?.trim() || DEFAULT_WS_URL;

export { TIME_SERVER_WS_URL };
