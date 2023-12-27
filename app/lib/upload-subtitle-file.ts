import type {ChangeEvent} from "react";
import {SubtitlePart} from "@/store/use-subtitle-store";


function parseSRT(srt: string): SubtitlePart[] {
    const subtitles: SubtitlePart[] = [];
    const subtitleChunks = srt.trim().split("\n\n");

    for (const chunk of subtitleChunks) {
        const lines = chunk.trim().split("\n");
        if (lines.length < 3) {
            // If there aren't enough lines, something is wrong with this chunk
            console.error("Invalid subtitle chunk:", chunk);
            continue; // Skip this chunk
        }

        const sequence = parseInt(lines[0]);
        if (isNaN(sequence)) {
            console.error("Invalid sequence number:", lines[0]);
            continue;
        }

        const times = lines[1].split(" --> ");
        if (times.length !== 2) {
            console.error("Invalid time format:", lines[1]);
            continue;
        }
        const start = times[0].trim();
        const end = times[1].trim();
        const text = lines.slice(2).join("\n");

        subtitles.push({sequence, start, end, text});
    }
    return subtitles;
}

export const uploadSubtitleFile = (event: ChangeEvent<HTMLInputElement>, cb: (subtitles: SubtitlePart[]) => void) => {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const content = e.target?.result;
            if (typeof content === "string") {
                try {
                    cb(parseSRT(content));
                } catch (error) {
                    console.error("Error parsing the SRT file", error);
                }
            }
        };
        reader.onerror = () => {
            console.error("Error reading the file");
        };
        reader.readAsText(file);
    }
    input.value = "";
};