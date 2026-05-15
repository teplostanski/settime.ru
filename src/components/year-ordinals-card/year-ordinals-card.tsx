import { dayjs } from '../../shared/dayjs';
import { Card } from '../Card';
import { CardHeader } from '../card-header';

type YearOrdinalsCardProps = {
  className?: string;
};

const YearOrdinalsCard = ({ className }: YearOrdinalsCardProps) => {
  const currentDate = dayjs(new Date());
  const weekOfYear = currentDate.isoWeek();
  const dayOfYear = currentDate.dayOfYear();

  return (
    <Card className={className} header={<CardHeader>неделя • день</CardHeader>}>
      <p className="content">{`${weekOfYear} • ${dayOfYear}`}</p>
    </Card>
  );
};

export { YearOrdinalsCard };
