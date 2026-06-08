import { Card } from '../card';
import { dayjs } from '../../shared/dayjs';
import { CardHeader } from '../card-header';
import { useSyncedNowMidnight } from '../../shared/hooks/use-synced-now';
import { useAppSelector } from '../../store/hooks';
import { selectTimeZone } from '../../store/features/timezone';

type DateCardProps = {
  className?: string;
};

const DateCard = ({ className }: DateCardProps) => {
  const timeZone = useAppSelector(selectTimeZone);
  const now = useSyncedNowMidnight(timeZone);
  const currentDate = dayjs(now).tz(timeZone);
  const weekday = currentDate.format('dddd');
  const dayAndMonth = currentDate.format('D MMMM');

  return (
    <Card className={className} header={<CardHeader>{weekday}</CardHeader>}>
      <p className="content">{dayAndMonth}</p>
    </Card>
  );
};

export { DateCard };
