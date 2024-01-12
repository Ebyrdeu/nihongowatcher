import {create} from "zustand";
import type {Subtitles} from "@/lib";

interface SubtitleStore {
    subtitles: Subtitles[];
    subtitle: string;
    isMoused: boolean;
    offset: number;
    setOffset: (value: number) => void;
    setMouse: (value: boolean) => void;
    setSubtitle: (subtitle: string) => void;
    setSubtitles: (subtitles: Subtitles[]) => void;
}


const useSubtitleStore = create<SubtitleStore>((set) => ({
    subtitle: "",
    subtitles: [],
    isMoused: false,
    offset: 0,
    setOffset: (offset) => set((s) => ({offset: s.offset + offset})),
    setSubtitle: (subtitle) => set(() => ({subtitle})),
    setSubtitles: (subtitles) => set(() => ({subtitles})),
    setMouse: (isMoused) => set(() => ({isMoused})),
}));

export {useSubtitleStore, type SubtitleStore};