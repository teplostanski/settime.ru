import { memo, useEffect, useState } from 'react';
import { Card } from '../Card';
import {
  msUntilNextLocalMidnight,
  scheduleAlignedTick,
} from '../../shared/scheduleAlignedTick';
import { formatLocaleDate } from '../../shared/utils';
import { CardHeader } from '../card-header/card-header';

type DateCardOuterProps = Record<string, never>;

const dateCardPropsAreEqual = (
  _prev: Readonly<DateCardOuterProps>,
  _next: Readonly<DateCardOuterProps>,
): boolean => {
  void _prev;
  void _next;
  return true;
};

const DateCardView = () => {
  const [date, setDate] = useState(() => new Date());

  useEffect(
    () =>
      scheduleAlignedTick(
        () => setDate(new Date()),
        msUntilNextLocalMidnight,
      ),
    [],
  );

  const weekday = formatLocaleDate(date, { weekday: 'long' });
  const dayAndMonth = formatLocaleDate(date, { day: 'numeric', month: 'long' });

  return (
    <Card header={<CardHeader>{weekday}</CardHeader>}>
      <p className="content">{dayAndMonth}</p>
    </Card>
  );
};

const DateCard = memo(DateCardView, dateCardPropsAreEqual);

DateCard.displayName = 'DateCard';

export { DateCard };
