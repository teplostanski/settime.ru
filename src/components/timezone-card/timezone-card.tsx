import { useMemo } from 'react';
import { formatUtcOffset } from '../../shared/time/format-utc-offset';
import { getTimezoneOptions } from '../../shared/time/timezones';
import { useSyncedNowMinute } from '../../shared/hooks/use-synced-now';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectTimeZone, setTimeZone } from '../../store/features/timezone';
import { Card } from '../card';
import { CardHeader } from '../card-header';
import { TimezoneSelect } from './timezone-select';

type TimezoneCardProps = {
  className?: string;
};

const TimezoneCard = ({ className }: TimezoneCardProps) => {
  const dispatch = useAppDispatch();
  const timeZone = useAppSelector(selectTimeZone);
  const now = useSyncedNowMinute();
  const options = useMemo(() => getTimezoneOptions(timeZone), [timeZone]);
  const offsetLabel = formatUtcOffset(timeZone, now);

  return (
    <Card className={className} header={<CardHeader>{offsetLabel}</CardHeader>}>
      <TimezoneSelect
        value={timeZone}
        options={options}
        aria-label="Часовой пояс"
        onChange={(nextTimeZone) =>
          dispatch(setTimeZone(nextTimeZone))
        }
      />
    </Card>
  );
};

export { TimezoneCard };
