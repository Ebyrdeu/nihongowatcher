import type {ChangeEvent} from "react";

enum SubtitleFormat {
    ASS = ".ass",
    SRT = ".srt",
    VTT = ".vtt"
}

type Subtitles = SRT | VTT | ASS;

interface SRT {
    sequence: number;
    start: string;
    end: string;
    text: string;
}

interface VTT {
    start: string;
    end: string;
    text: string;
}

interface ASS {
    layer: number;
    start: string;
    end: string;
    style: string;
    name: string;
    marginL: string;
    marginR: string;
    marginV: string;
    effect: string;
    text: string;
}


class SubtitleParser {
    public static upload(event: ChangeEvent<HTMLInputElement>, cb: (subtitles: Subtitles[]) => void): void {
        const input = event.target as HTMLInputElement;
        if (!input.files) {
            console.error("No file was selected");
            return;
        }
        const file = input.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                try {
                    const content = e.target?.result;
                    if (typeof content === "string") {
                        const format = this.findFormat(file.name);
                        const subtitles = this.parseContent(content, format);
                        cb(subtitles);
                    }
                } catch (error) {
                    console.error("Error parsing the file:", error);
                }
            };
            reader.onerror = () => {
                console.error("Error reading the file");
            };
            reader.readAsText(file);
        }
        input.value = "";
    }

    private static parseContent(content: string, format: SubtitleFormat): Subtitles[] {
        switch (format) {
            case SubtitleFormat.ASS:
                return this.ass(content);
            case SubtitleFormat.SRT:
                return this.srt(content);
            case SubtitleFormat.VTT:
                return this.vtt(content);
            default:
                throw new Error(`Unsupported subtitle format: ${format}`);
        }
    }

    private static findFormat(filename: string): SubtitleFormat {
        if (filename.includes(SubtitleFormat.ASS)) return SubtitleFormat.ASS;
        if (filename.includes(SubtitleFormat.SRT)) return SubtitleFormat.SRT;
        if (filename.includes(SubtitleFormat.VTT)) return SubtitleFormat.VTT;
        throw new Error("Unsupported or unknown subtitle format");
    }

    private static srt(subtitle: string): SRT[] {
        const subtitlesList: SRT[] = [];
        const subtitleChunks = subtitle.trim().split("\n\n");

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

            subtitlesList.push({sequence, start, end, text});
        }
        return subtitlesList;
    }

    private static vtt(subtitle: string): VTT[] {
        const subtitlesList: VTT[] = [];
        const subtitleChunks = subtitle.trim().split("\n\n");

        for (const chunk of subtitleChunks) {
            const lines = chunk.trim().split("\n");

            if (lines.includes("WEBVTT")) continue;


            if (lines.length < 2) {
                console.error("Invalid subtitle chunk:", chunk);
                continue;
            }

            const times = lines[0].split(" --> ");
            if (times.length !== 2) {
                console.error("Invalid time format:", lines[0]);
                continue;
            }


            const start = times[0].trim();
            const end = times[1].trim();
            const text = lines.slice(1).join("\n");

            subtitlesList.push({start, end, text});
        }
        return subtitlesList;
    }

    private static ass(subtitle: string): ASS[] {
        const subtitleList: ASS[] = [];
        const subtitleChunks = subtitle.trim().split("\n");

        for (let chunk of subtitleChunks) {
            if (chunk.startsWith("Dialogue: ")) {
                const times = chunk.substring(10).split(",");

                if (times.length < 10) {
                    console.error("Invalid subtitle chunk:", chunk);
                    continue;
                }

                const [, start, end, style, name, marginL, marginR, marginV, effect] = times;
                const text = times[9].replace(/\\N|\\\\N|\r|\{.*?}/g, "\n");
                const layer = Number.parseInt(times[0]);

                subtitleList.push({
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
        return subtitleList;
    }
}

export {SubtitleParser, type Subtitles};
