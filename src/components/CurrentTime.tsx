import { useEffect, useState } from 'react';
import { padZero } from '../shared/utils';

export function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <span className="time">
        {padZero(currentTime.getHours())}:{padZero(currentTime.getMinutes())}:
        {padZero(currentTime.getSeconds())}
      </span>
    </>
  );
}
