
export function formatDateTime(isoString: string | undefined) {
  if (!isoString) return { date: '', time: '' };
  const dateObj = new Date(isoString);
  const date = dateObj.toLocaleDateString('en-CA');
  const time = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return { date, time };
}