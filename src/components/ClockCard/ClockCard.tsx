import { memo, useMemo } from 'react';
import { DigitalTime } from '../DigitalTime';
import { Card } from '../Card';
import { VerbalTime } from '../VerbalTime';

type ClockCardProps = {
  className?: string;
};

const clockCardPropsAreEqual = (
  prev: Readonly<ClockCardProps>,
  next: Readonly<ClockCardProps>,
): boolean => prev.className === next.className;

const ClockCardView = ({ className }: ClockCardProps) => {
  const header = useMemo(() => <VerbalTime />, []);
  const content = useMemo(() => <DigitalTime />, []);

  return (
    <Card className={className} header={header}>
      {content}
    </Card>
  );
};

const ClockCard = memo(ClockCardView, clockCardPropsAreEqual);

ClockCard.displayName = 'ClockCard';

export { ClockCard };
