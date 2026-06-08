import { useLayoutEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { DigitPhase, type Phase } from './digit-phase';
import styles from './digit-slot.module.css';

type DigitItem = {
  id: string;
  value: string;
  phase: Phase;
};

type DigitSlotProps = {
  value: string;
};

const DigitSlot = ({ value }: DigitSlotProps) => {
  const nextId = useRef(0);
  const createId = () => String(++nextId.current);

  const [digits, setDigits] = useState<DigitItem[]>([
    { value, id: createId(), phase: DigitPhase.Idle },
  ]);

  useLayoutEffect(() => {
    setDigits((prev) => {
      const current = prev[prev.length - 1];

      if (current.value === value) {
        return prev;
      }

      return [
        ...prev.map((digit) =>
          digit === current
            ? { ...digit, phase: DigitPhase.Exiting }
            : digit,
        ),
        { value, id: createId(), phase: DigitPhase.Entering },
      ];
    });
  }, [value]);

  const handleAnimationEnd = (id: string, phase: Phase) => {
    if (phase === DigitPhase.Exiting) {
      setDigits((prev) => prev.filter((digit) => digit.id !== id));
      return;
    }

    if (phase === DigitPhase.Entering) {
      setDigits((prev) =>
        prev.map((digit) =>
          digit.id === id ? { ...digit, phase: DigitPhase.Idle } : digit,
        ),
      );
    }
  };

  return (
    <span className={styles.wrapper}>
      {digits.map((digit) => (
        <span
          key={digit.id}
          className={cn(styles.inner, {
            [styles.exiting]: digit.phase === DigitPhase.Exiting,
            [styles.entering]: digit.phase === DigitPhase.Entering,
          })}
          onAnimationEnd={() => handleAnimationEnd(digit.id, digit.phase)}
        >
          {digit.value}
        </span>
      ))}
    </span>
  );
};

export { DigitSlot, type DigitSlotProps };
