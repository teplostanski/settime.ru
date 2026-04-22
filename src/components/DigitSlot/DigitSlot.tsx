import {
  memo,
  useLayoutEffect,
  useState,
  useTransition,
} from 'react';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import styles from './DigitSlot.module.css';

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

const DigitSlotView = ({ value }: DigitSlotProps) => {
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

    const exitTimer = setTimeout(() => {
      setDigits((prev) => prev.filter((d) => !d.isExiting));
    }, ANIMATION_DURATION);

    const enterTimer = setTimeout(() => {
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
};

const DigitSlot = memo(DigitSlotView);

DigitSlot.displayName = 'DigitSlot';

export { DigitSlot, type DigitSlotProps };
