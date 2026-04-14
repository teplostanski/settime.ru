import { useEffect, useState } from 'react';
import { padZero } from '../../shared/utils';
import { verbalPhraseByTimeKey } from '../../shared/constants';
import styles from './VerbalTime.module.css';

const currentTime = new Date(Date.now());

console.log(
  `${padZero(currentTime.getHours())}:${padZero(currentTime.getMinutes())}:${padZero(currentTime.getSeconds())}`,
);

const formatVerbalTime = (hours: number, minutes: number): string => {
  const timeKey =
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}` as keyof typeof verbalPhraseByTimeKey;
  return verbalPhraseByTimeKey[timeKey] || undefined;
};

const getRoundedVerbalTime = (): string => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  return formatVerbalTime(hours, minutes);
};

console.log(getRoundedVerbalTime());

const VerbalTime = () => {
  const [timeWord, setTimeWord] = useState(getRoundedVerbalTime());

  useEffect(() => {
    const timer = setInterval(() => setTimeWord(getRoundedVerbalTime()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div className={styles.verbalTime}>{timeWord}</div>;
};

export { VerbalTime };
