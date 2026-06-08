const computeOffsetMs = (serverMs: number, clientMs: number): number =>
  serverMs - clientMs;

const getSynchronizedMs = (offsetMs: number, clientMs = Date.now()): number =>
  clientMs + offsetMs;

const getSynchronizedDate = (offsetMs: number, clientMs = Date.now()): Date =>
  new Date(getSynchronizedMs(offsetMs, clientMs));

export { computeOffsetMs, getSynchronizedDate };
