export const padZero = (unit: number) => {
  if (unit < 10) {
    return `0${unit}`;
  }

  return String(unit);
};