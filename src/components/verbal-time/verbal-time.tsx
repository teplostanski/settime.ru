import { verbalPhraseByTimeKey } from '../../shared/constants';
import { CardHeader } from '../card-header';
import { useSyncedNowMinute } from '../../shared/hooks/use-synced-now';
import { getZonedTimeParts } from '../../shared/time/get-zoned-time-parts';
import { useAppSelector } from '../../store/hooks';
import { selectTimeZone } from '../../store/features/timezone';

const formatVerbalTime = (
  hours: number,
  minutes: number,
): string | undefined => {
  const timeKey =
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}` as keyof typeof verbalPhraseByTimeKey;
  return verbalPhraseByTimeKey[timeKey];
};

const VerbalTime = () => {
  const timeZone = useAppSelector(selectTimeZone);
  const now = useSyncedNowMinute(timeZone);
  const { hours, minutes } = getZonedTimeParts(now, timeZone);
  const phrase = formatVerbalTime(hours, minutes) ?? '';

  return <CardHeader>{phrase}</CardHeader>;
};

export { VerbalTime };
