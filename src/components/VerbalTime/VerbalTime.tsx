import { memo, useEffect, useState } from 'react';
import { verbalPhraseByTimeKey } from '../../shared/constants';
import styles from './VerbalTime.module.css';

const formatVerbalTime = (hours: number, minutes: number): string | undefined => {
  const timeKey =
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}` as keyof typeof verbalPhraseByTimeKey;
  return verbalPhraseByTimeKey[timeKey];
};

const getVerbalPhrase = (): string => {
  const now = new Date();
  return formatVerbalTime(now.getHours(), now.getMinutes()) ?? '';
};

const VerbalTimeView = () => {
  const [phrase, setPhrase] = useState(getVerbalPhrase);

  useEffect(() => {
    const sync = () => {
      setPhrase(getVerbalPhrase());
    };

    const msToNextMinute = () => {
      const t = new Date();
      return (60 - t.getSeconds()) * 1000 - t.getMilliseconds();
    };

    let intervalId: ReturnType<typeof setInterval> | undefined;

    const timeoutId = setTimeout(() => {
      sync();
      intervalId = setInterval(sync, 60_000);
    }, msToNextMinute());

    return () => {
      clearTimeout(timeoutId);
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div className={styles.verbalTime}>
      {phrase}
    </div>
  );
};

const VerbalTime = memo(VerbalTimeView);

VerbalTime.displayName = 'VerbalTime';

export { VerbalTime };
