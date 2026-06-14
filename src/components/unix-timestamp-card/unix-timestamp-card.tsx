import { useSyncedNowSecond } from '../../shared/hooks/use-synced-now';
import { useAppSelector } from '../../store/hooks';
import { selectTimeZone } from '../../store/features/timezone';
import { Card } from '../card';
import { CardHeader } from '../card-header';

type UnixTimestampCardProps = {
  className?: string;
};

const UnixTimestampCard = ({ className }: UnixTimestampCardProps) => {
  const timeZone = useAppSelector(selectTimeZone);
  const now = useSyncedNowSecond(timeZone);
  const unixSeconds = Math.floor(now.getTime() / 1000);

  return (
    <Card className={className} header={<CardHeader>unix время</CardHeader>}>
      <p className="content">{unixSeconds}</p>
    </Card>
  );
};

export { UnixTimestampCard };
