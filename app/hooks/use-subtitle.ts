import React from "react";
import {useSubtitleStore} from "@/store";
export const useSubtitle = () => {
    const {setSubtitle, subtitles, offset} = useSubtitleStore();
    const setSubtitlesToCurrentVideoProgress = (event: React.SyntheticEvent<HTMLVideoElement>) => {

        const timeToSeconds = (time: string) => {
            const [hours, minutes, seconds] = time.split(":");
            // needed because some subtitles includes , as milliseconds separator and some . as separator
            const millisecondsFormat = seconds.includes(",") ? seconds.replace(",", ".") : seconds;
            const result = Number(hours) * 3600 + Number(minutes) * 60 + Number(millisecondsFormat);
            return result + offset;
        };

        const currentTime = event.currentTarget.currentTime;
        let subtitleDisplayed = false;

        subtitles.forEach(subtitle => {
            const start = timeToSeconds(subtitle.start);
            console.log(subtitle)
            const end = timeToSeconds(subtitle.end);
            if (currentTime >= start && currentTime <= end) {
                setSubtitle(subtitle.text);
                subtitleDisplayed = true;
            }
        });

        if (!subtitleDisplayed) setSubtitle("");

    };

    return {
        setSubtitlesToCurrentVideoProgress,
    };
};