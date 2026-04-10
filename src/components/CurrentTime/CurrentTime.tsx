import { useEffect, useState } from 'react';
import { DigitSlot } from '../DigitSlot';
import { padZero } from '../../shared/utils';
import styles from './CurrentTime.module.css';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const hours = padZero(currentTime.getHours());
  const minutes = padZero(currentTime.getMinutes());
  const seconds = padZero(currentTime.getSeconds());

  return (
    <div className={styles.root}>
      <span className={styles.time} role="timer" aria-live="polite">
        <span className={styles.segment}>
          <DigitSlot value={hours[0]} />
          <DigitSlot value={hours[1]} />
        </span>
        <span className={styles.sep}>:</span>
        <span className={styles.segment}>
          <DigitSlot value={minutes[0]} />
          <DigitSlot value={minutes[1]} />
        </span>
        <span className={styles.sep}>:</span>
        <span className={styles.segment}>
          <DigitSlot value={seconds[0]} />
          <DigitSlot value={seconds[1]} />
        </span>
      </span>
    </div>
  );
};

export { CurrentTime };
