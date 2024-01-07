import {create} from "zustand";
import type {Subtitles} from "@/lib";

interface SubtitleStore {
    subtitles: Subtitles[];
    subtitle: string;
    isMoused: boolean;
    setMouse: (value: boolean) => void;
    setSubtitle: (subtitle: string) => void;
    setSubtitles: (subtitles: Subtitles[]) => void;
}


const useSubtitleStore = create<SubtitleStore>((set) => ({
    subtitle: "",
    subtitles: [],
    isMoused: false,
    setSubtitle: (subtitle) => set(() => ({subtitle})),
    setSubtitles: (subtitles) => set(() => ({subtitles})),
    setMouse: (isMoused) => set(() => ({isMoused})),
}));

export {useSubtitleStore, type SubtitleStore};