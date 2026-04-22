import { memo, useEffect, useState } from 'react';
import { Card } from '../Card';
import { msUntilLocalMidnight } from '../../shared/utils';

const formatRU = (options: Intl.DateTimeFormatOptions, date: Date) =>
  new Intl.DateTimeFormat('ru-RU', options).format(date);

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

  useEffect(() => {
    let id: ReturnType<typeof setTimeout>;

    const arm = () => {
      id = setTimeout(() => {
        setDate(new Date());
        arm();
      }, msUntilLocalMidnight(new Date()));
    };

    arm();
    return () => {
      clearTimeout(id);
    };
  }, []);

  const weekday = formatRU({ weekday: 'long' }, date);
  const dayMonth = formatRU({ day: 'numeric', month: 'long' }, date);

  return (
    <Card header={<span>{weekday}</span>}>
      <p>{dayMonth}</p>
    </Card>
  );
};

const DateCard = memo(DateCardView, dateCardPropsAreEqual);

DateCard.displayName = 'DateCard';

export { DateCard };
