import {create} from "zustand";

interface SubtitleStore {
    subtitles: SubtitlePart[];
    subtitle: string;
    isMoused: boolean;
    setMouse: (value: boolean) => void;
    setSubtitle: (subtitle: string) => void;
    setSubtitles: (subtitles: SubtitlePart[]) => void;
}

interface SubtitlePart {
    sequence: number;
    start: string;
    end: string;
    text: string;
}


const useSubtitleStore = create<SubtitleStore>((set) => ({
    subtitle: "",
    subtitles: [],
    isMoused: false,
    setSubtitle: (subtitle) => set(() => ({subtitle})),
    setSubtitles: (subtitles) => set(() => ({subtitles})),
    setMouse: (isMoused) => set(() => ({isMoused})),
}));

export {useSubtitleStore, type SubtitleStore, type SubtitlePart};