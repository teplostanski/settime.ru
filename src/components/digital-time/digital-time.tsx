import { dayjs } from '../../shared/dayjs';
import { DigitSlot } from '../digit-slot';
import styles from './digital-time.module.css';
import { useSyncedNowSecond } from '../../shared/hooks/use-synced-now';
import { useAppSelector } from '../../store/hooks';
import { selectTimeZone } from '../../store/features/timezone';

type HoursMinutesDigitsProps = {
  hours: string;
  minutes: string;
};

const HoursMinutesDigits = ({ hours, minutes }: HoursMinutesDigitsProps) => (
  <>
    <span className={styles.group}>
      <DigitSlot value={hours[0]!} />
      <DigitSlot value={hours[1]!} />
    </span>
    <span className={styles.separator}>:</span>
    <span className={styles.group}>
      <DigitSlot value={minutes[0]!} />
      <DigitSlot value={minutes[1]!} />
    </span>
  </>
);

type SecondsDigitsProps = {
  seconds: string;
};

const SecondsDigits = ({ seconds }: SecondsDigitsProps) => (
  <>
    <span className={styles.separator}>:</span>
    <span className={styles.group}>
      <DigitSlot value={seconds[0]!} />
      <DigitSlot value={seconds[1]!} />
    </span>
  </>
);

const DigitalTime = () => {
  const timeZone = useAppSelector(selectTimeZone);
  const now = useSyncedNowSecond(timeZone);
  const [hoursText, minutesText, secondsText] = dayjs(now)
    .tz(timeZone)
    .format('HH:mm:ss')
    .split(':');

  return (
    <div className={styles.wrapper}>
      <span className={styles.inner} role="timer" aria-live="polite">
        <HoursMinutesDigits hours={hoursText} minutes={minutesText} />
        <SecondsDigits seconds={secondsText} />
      </span>
    </div>
  );
};

export { DigitalTime };
