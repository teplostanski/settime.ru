import { useEffect, useState } from 'react';
import { verbalPhraseByTimeKey } from '../../shared/constants';
import { CardHeader } from '../card-header/card-header';
import {
  msUntilNextMinute,
  scheduleAlignedTick,
} from '../../shared/scheduleAlignedTick';

const formatVerbalTime = (
  hours: number,
  minutes: number,
): string | undefined => {
  const timeKey =
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}` as keyof typeof verbalPhraseByTimeKey;
  return verbalPhraseByTimeKey[timeKey];
};

const getVerbalPhrase = (): string => {
  const now = new Date();
  return formatVerbalTime(now.getHours(), now.getMinutes()) ?? '';
};

const VerbalTime = () => {
  const [phrase, setPhrase] = useState(getVerbalPhrase);

  useEffect(
    () =>
      scheduleAlignedTick(() => setPhrase(getVerbalPhrase()), msUntilNextMinute),
    [],
  );

  return <CardHeader>{phrase}</CardHeader>;
};

VerbalTime.displayName = 'VerbalTime';

export { VerbalTime };
