import { useSyncedNowSecond } from '../../shared/hooks/use-synced-now';
import { Card } from '../card';
import { CardHeader } from '../card-header';

type UnixTimestampCardProps = {
  className?: string;
};

const UnixTimestampCard = ({ className }: UnixTimestampCardProps) => {
  const now = useSyncedNowSecond();
  const unixSeconds = Math.floor(now.getTime() / 1000);

  return (
    <Card className={className} header={<CardHeader>unix время</CardHeader>}>
      <p className="content">{unixSeconds}</p>
    </Card>
  );
};

export { UnixTimestampCard };
