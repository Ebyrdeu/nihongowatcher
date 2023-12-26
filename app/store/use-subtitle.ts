import {create} from "zustand";

interface SubtitleStore {
    subtitle: string;
    isMoused: boolean;
    setMouse: (value: boolean) => void;
    setSubtitle: (subtitle: string) => void;
}


const useSubtitleStore = create<SubtitleStore>((set) => ({
    subtitle: "",
    isMoused: false,
    setSubtitle: (subtitle) => set(() => ({subtitle})),
    setMouse: (isMoused) => set(() => ({isMoused})),
}));

export {useSubtitleStore, type SubtitleStore};