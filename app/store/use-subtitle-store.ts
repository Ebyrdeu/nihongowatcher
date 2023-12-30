import {create} from "zustand";

interface SubtitleStore {
    subtitles: Subtitles[];
    subtitle: string;
    isMoused: boolean;
    setMouse: (value: boolean) => void;
    setSubtitle: (subtitle: string) => void;
    setSubtitles: (subtitles: Subtitles[]) => void;
}

type Subtitles = SRTPart | ASSPart;

interface SRTPart {
    sequence: number;
    start: string;
    end: string;
    text: string;
}

interface ASSPart {
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


const useSubtitleStore = create<SubtitleStore>((set) => ({
    subtitle: "",
    subtitles: [],
    isMoused: false,
    setSubtitle: (subtitle) => set(() => ({subtitle})),
    setSubtitles: (subtitles) => set(() => ({subtitles})),
    setMouse: (isMoused) => set(() => ({isMoused})),
}));

export {useSubtitleStore, type SubtitleStore, type SRTPart, type ASSPart, type Subtitles};