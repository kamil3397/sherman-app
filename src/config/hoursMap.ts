const startHour = Number(process.env.REACT_APP_START_DAY_HOUR) || 9;
const endHour = Number(process.env.REACT_APP_END_DAY_HOUR) || 20;

export const HOURS_ARR = [...Array(endHour - startHour + 1)].map((_, hourIndex) => {
  const hour = startHour + hourIndex;
  return { label: `${hour < 10 ? '0' : ''}${hour}:00`, value: hour };
});
