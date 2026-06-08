import { dayjs } from '../../shared/dayjs';
import { useSyncedNowMidnight } from '../../shared/hooks/use-synced-now';
import { useAppSelector } from '../../store/hooks';
import { selectTimeZone } from '../../store/features/timezone';
import { Card } from '../card';
import { CardHeader } from '../card-header';

type YearOrdinalsCardProps = {
  className?: string;
};

const YearOrdinalsCard = ({ className }: YearOrdinalsCardProps) => {
  const timeZone = useAppSelector(selectTimeZone);
  const now = useSyncedNowMidnight(timeZone);
  const currentDate = dayjs(now).tz(timeZone);

  return (
    <Card className={className} header={<CardHeader>неделя • день</CardHeader>}>
      <p className="content">
        {`${currentDate.isoWeek()} • ${currentDate.dayOfYear()}`}
      </p>
    </Card>
  );
};

export { YearOrdinalsCard };
