class TimeParser {
    public static toClock(time: number): string {
        const formattedHours = this.toTwoDigits(time / 3600);
        const formattedMinutes = this.toTwoDigits((time % 3600) / 60);
        const formattedSeconds = this.toTwoDigits(time % 60);

        const isHours = formattedHours === "00" ? "" : `${formattedHours}:`;

        return `${isHours}${formattedMinutes}:${formattedSeconds}`;
    }

    private static toTwoDigits(value: number): string {
        const newValue = Math.floor(value);
        return String(newValue).padStart(2, "0");
    }

}

export {TimeParser};