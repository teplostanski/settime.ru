type ZonedTimeParts = {
  hours: number;
  minutes: number;
  seconds: number;
};

const getZonedTimeParts = (at: Date, timeZone: string): ZonedTimeParts => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(at);

  const read = (type: Intl.DateTimeFormatPartTypes): number => {
    const value = parts.find((part) => part.type === type)?.value ?? '0';
    return Number.parseInt(value, 10);
  };

  return {
    hours: read('hour') % 24,
    minutes: read('minute'),
    seconds: read('second'),
  };
};

export { getZonedTimeParts };
