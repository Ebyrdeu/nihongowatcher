import type {ChangeEvent} from "react";
import type {ASSPart, SRTPart, Subtitles} from "@/store/use-subtitle-store";


const parseSRT = (srt: string): SRTPart[] => {
    const subtitles: SRTPart[] = [];
    const subtitleChunks = srt.trim().split("\n\n");

    for (const chunk of subtitleChunks) {
        const lines = chunk.trim().split("\n");
        if (lines.length < 3) {
            console.error("Invalid subtitle chunk:", chunk);
            continue;
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
};

const parseASS = (ass: string): ASSPart[] => {
    const dialogues: ASSPart[] = [];
    const subtitleChunks = ass.trim().split("\n");

    for (let chunk of subtitleChunks) {
        if (chunk.startsWith("Dialogue: ")) {
            const times = chunk.substring(10).split(",");

            if (times.length < 10) {
                console.error("Invalid subtitle chunk:", chunk);
                continue;
            }

            const [, start, end, style, name, marginL, marginR, marginV, effect] = times;
            const text = times[9].replace(/\\N|\\\\N|\r|\{.*?}/g, "").trim();
            const layer = Number.parseInt(times[0]);

            dialogues.push({
                layer,
                start,
                end,
                style,
                name,
                marginL,
                marginR,
                marginV,
                effect,
                text,
            });
        }
    }


    return dialogues;
};

export const uploadSubtitleFile = (event: ChangeEvent<HTMLInputElement>, cb: (subtitles: Subtitles[]) => void) => {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const content = e.target?.result;
            if (typeof content === "string") {
                try {
                    if (file.name.includes(".ass")) cb(parseASS(content));
                    if (file.name.includes(".srt") || file.name.includes(".vtt")) parseSRT(content);
                } catch (error) {
                    console.error("Error parsing the file", error);
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