import {
  useEffect,
  useLayoutEffect,
  useState,
  useTransition,
} from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import { padZero } from '../shared/utils';
import styles from './CurrentTime.module.css';

const ANIMATION_DURATION = 350;

interface DigitItem {
  value: string;
  isExiting: boolean;
  isEntering: boolean;
  id: string;
}

interface DigitSlotProps {
  value: string;
}

function DigitSlot({ value }: DigitSlotProps) {
  const [digits, setDigits] = useState<DigitItem[]>([
    { value, isExiting: false, isEntering: false, id: nanoid() },
  ]);
  const [, startTransition] = useTransition();

  useLayoutEffect(() => {
    startTransition(() => {
      setDigits((prevDigits) => {
        const lastDigit = prevDigits[prevDigits.length - 1];
        if (lastDigit.value === value) return prevDigits;

        return [
          { ...lastDigit, isExiting: true, isEntering: false },
          { value, isExiting: false, isEntering: true, id: nanoid() },
        ];
      });
    });

    const exitTimer = window.setTimeout(() => {
      setDigits((prev) => prev.filter((d) => !d.isExiting));
    }, ANIMATION_DURATION);

    const enterTimer = window.setTimeout(() => {
      setDigits((prev) =>
        prev.map((d) => (d.isEntering ? { ...d, isEntering: false } : d)),
      );
    }, ANIMATION_DURATION);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(enterTimer);
    };
  }, [value]);

  return (
    <span className={styles.digitWrapper}>
      {digits.map((digit) => (
        <span
          key={digit.id}
          className={cn(styles.digit, {
            [styles.digitExit]: digit.isExiting,
            [styles.digitEnter]: digit.isEntering,
          })}
        >
          {digit.value}
        </span>
      ))}
    </span>
  );
}

export function CurrentTime() {
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
  );
}
