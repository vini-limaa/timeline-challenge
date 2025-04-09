
export function getDateRange(items) {
  const allDates = items.flatMap((item) => [new Date(item.start), new Date(item.end)]);
  const minDate = new Date(Math.min(...allDates));
  const maxDate = new Date(Math.max(...allDates));
  return { minDate, maxDate };
}

export function dateToPosition(date, minDate, maxDate, timelineWidth) {
  const totalDuration = maxDate - minDate;
  const elapsed = new Date(date) - minDate;
  return (elapsed / totalDuration) * timelineWidth;
}
