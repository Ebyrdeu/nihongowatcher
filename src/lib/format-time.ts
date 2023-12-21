const convertToTwoDigits = (value: number) => {
    const newValue = Math.floor(value);
    return String(newValue).padStart(2, "0");
};

export const formatTime = (time: number) => {
    const formattedMinutes = convertToTwoDigits(Math.floor(time / 60));
    const formattedSeconds = convertToTwoDigits(Math.floor(time % 60));
    return `${formattedMinutes}:${formattedSeconds}`;
};