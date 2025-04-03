export const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short" };
  return date.toLocaleDateString('en-GB', options);
};

export const getDayOfWeek = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  return date.toLocaleDateString('en-US', options);
};

export const getRelativeDay = (date: Date, currentDate: Date) => {
  const timeDifference = date.getTime() - currentDate.getTime();
  const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day

  const diffDays = Math.round(timeDifference / oneDay);

  if (diffDays === 0) return 'Today';
  if (diffDays === -1) return 'Yesterday';
  if (diffDays === 1) return 'Tomorrow';

  // If it's more than a day away, return the day of the week
  return getDayOfWeek(date);
};