const formatUtcOffset = (timeZone: string, at: Date = new Date()): string => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'shortOffset',
  }).formatToParts(at);

  const raw =
    parts.find((part) => part.type === 'timeZoneName')?.value ?? 'UTC';

  return raw.replace(/^GMT/i, 'UTC');
};

export { formatUtcOffset };
