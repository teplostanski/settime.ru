import { ClockSyncStatus } from '../clock-sync-status';
import { DigitalTime } from '../digital-time';
import { Card } from '../card';
import { VerbalTime } from '../verbal-time';

type ClockCardProps = {
  className?: string;
};

const ClockCard = ({ className }: ClockCardProps) => (
  <Card className={className} header={<VerbalTime />}>
    <DigitalTime />
    <ClockSyncStatus />
  </Card>
);

export { ClockCard };
