import { memo, useMemo } from 'react';
import { DigitalTime } from '../DigitalTime';
import { Card } from '../Card';
import { VerbalTime } from '../VerbalTime';

type ClockCardOuterProps = Record<string, never>;

const clockCardPropsAreEqual = (
  _prev: Readonly<ClockCardOuterProps>,
  _next: Readonly<ClockCardOuterProps>,
): boolean => {
  void _prev;
  void _next;
  return true;
};

const ClockCardView = () => {
  const header = useMemo(() => <VerbalTime />, []);
  const content = useMemo(() => <DigitalTime />, []);

  return (
    <Card header={header}>
      {content}
    </Card>
  );
};

const ClockCard = memo(ClockCardView, clockCardPropsAreEqual);

ClockCard.displayName = 'ClockCard';

export { ClockCard };
