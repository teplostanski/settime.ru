import { memo, useEffect, useState } from 'react';
import { DigitSlot } from '../DigitSlot';
import { padZero } from '../../shared/utils';
import styles from './DigitalTime.module.css';

type HoursMinutesDigitsProps = {
  hours: string;
  minutes: string;
};

const HoursMinutesDigits = memo(({ hours, minutes }: HoursMinutesDigitsProps) => (
  <>
    <span className={styles.segment}>
      <DigitSlot value={hours[0]!} />
      <DigitSlot value={hours[1]!} />
    </span>
    <span className={styles.sep}>:</span>
    <span className={styles.segment}>
      <DigitSlot value={minutes[0]!} />
      <DigitSlot value={minutes[1]!} />
    </span>
  </>
));

HoursMinutesDigits.displayName = 'HoursMinutesDigits';

type SecondsDigitsProps = {
  seconds: string;
};

const SecondsDigits = memo(({ seconds }: SecondsDigitsProps) => (
  <>
    <span className={styles.sep}>:</span>
    <span className={styles.segment}>
      <DigitSlot value={seconds[0]!} />
      <DigitSlot value={seconds[1]!} />
    </span>
  </>
));

SecondsDigits.displayName = 'SecondsDigits';

const DigitalTime = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  const hours = padZero(now.getHours());
  const minutes = padZero(now.getMinutes());
  const seconds = padZero(now.getSeconds());

  return (
    <div className={styles.root}>
      <span className={styles.time} role="timer" aria-live="polite">
        <HoursMinutesDigits hours={hours} minutes={minutes} />
        <SecondsDigits seconds={seconds} />
      </span>
    </div>
  );
};

export { DigitalTime };
