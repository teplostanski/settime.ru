import { dayjs } from '../../shared/dayjs';
import { verbalPhraseByTimeKey } from '../../shared/verbal-phrase-by-time-key';
import { CardHeader } from '../card-header';
import { useSyncedNowMinute } from '../../shared/hooks/use-synced-now';
import { useAppSelector } from '../../store/hooks';
import { selectTimeZone } from '../../store/features/timezone';

const VerbalTime = () => {
  const timeZone = useAppSelector(selectTimeZone);
  const now = useSyncedNowMinute(timeZone);
  const timeKey = dayjs(now).tz(timeZone).format('HH:mm') as keyof typeof verbalPhraseByTimeKey;
  const phrase = verbalPhraseByTimeKey[timeKey] ?? '';

  return <CardHeader>{phrase}</CardHeader>;
};

export { VerbalTime };
