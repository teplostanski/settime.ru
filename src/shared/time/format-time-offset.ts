import { MS_PER_SECOND } from './time-constants';

const SYNC_NOISE_THRESHOLD_MS = 300;

const toUserOffsetMs = (offsetMs: number): number => -offsetMs;

const normalizeUserOffsetMs = (offsetMs: number): number => {
  const userOffsetMs = toUserOffsetMs(offsetMs);

  return Math.abs(userOffsetMs) < SYNC_NOISE_THRESHOLD_MS ? 0 : userOffsetMs;
};

const formatSignedOffset = (userOffsetMs: number): string => {
  if (userOffsetMs === 0) {
    return '';
  }

  const seconds = Math.abs(userOffsetMs) / MS_PER_SECOND;
  const formatted = Number.isInteger(seconds)
    ? String(seconds)
    : seconds.toFixed(1);

  return `${formatted} сек.`;
};

const formatTimeOffset = (offsetMs: number): string =>
  formatSignedOffset(normalizeUserOffsetMs(offsetMs));

const getTimeOffsetCaption = (offsetMs: number): string => {
  const userOffsetMs = normalizeUserOffsetMs(offsetMs);

  if (userOffsetMs > 0) {
    return 'ваши часы спешат на';
  }

  if (userOffsetMs < 0) {
    return 'ваши часы отстают на';
  }

  return 'у вас точное время';
};

export { formatTimeOffset, getTimeOffsetCaption };
