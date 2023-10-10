export function convertToTwoDigits (value: number) {
  const newValue = Math.floor(value);
  return String(newValue).padStart(2, '0');
}