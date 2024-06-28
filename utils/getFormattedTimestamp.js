// Return formatted date in MM/DD/YYY HH:MM PM format.
export default function getFormattedTimestamp(timestamp) {
  // If the timestamp string from the DB isn't a valid JS time string, just return it as is.
  if (!new Date(timestamp).getTime() > 0) {
    return timestamp;
  }

  const date = new Date(timestamp);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);

  return formattedDate;
};
