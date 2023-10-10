export function timeConverter (videoNode: HTMLVideoElement) {

  const totalMinutes = convertToTwoDigits(videoNode.duration / 60);
  const totalSeconds = convertToTwoDigits(videoNode.duration % 60);

  const currentMinutes = convertToTwoDigits(videoNode.currentTime / 60);
  const currentSeconds = convertToTwoDigits(videoNode.currentTime % 60);

  return `${currentMinutes}:${currentSeconds} / ${ totalMinutes}:${totalSeconds}`;
}

function convertToTwoDigits (value: number) {
  const newValue = Math.floor(value);
  return String(newValue).padStart(2, '0');
}