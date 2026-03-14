import { useEffect, useState } from 'react';

const padZero = (unit: number) => {
  if (unit < 10) {
    return `0${unit}`;
  }

  return String(unit);
};

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
