import { memo, useEffect, useState } from 'react';
import { Card } from '../Card';
import {
  msUntilNextLocalMidnight,
  scheduleAlignedTick,
} from '../../shared/scheduleAlignedTick';
import { dayjs } from '../../shared/dayjs';
import { CardHeader } from '../card-header';

type DateCardProps = {
  className?: string;
};

const dateCardPropsAreEqual = (
  prev: Readonly<DateCardProps>,
  next: Readonly<DateCardProps>,
): boolean => prev.className === next.className;

const DateCardView = ({ className }: DateCardProps) => {
  const [date, setDate] = useState(() => new Date());

  useEffect(
    () =>
      scheduleAlignedTick(
        () => setDate(new Date()),
        msUntilNextLocalMidnight,
      ),
    [],
  );

  const currentDate = dayjs(date);
  const weekday = currentDate.format('dddd');
  const dayAndMonth = currentDate.format('D MMMM');

  return (
    <Card className={className} header={<CardHeader>{weekday}</CardHeader>}>
      <p className="content">{dayAndMonth}</p>
    </Card>
  );
};

const DateCard = memo(DateCardView, dateCardPropsAreEqual);

DateCard.displayName = 'DateCard';

export { DateCard };
