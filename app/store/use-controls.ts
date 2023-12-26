import {create} from "zustand";

interface ControlStore {
    videoProgress: number[];
    pause: boolean;
    fullscreen: boolean,
    setVideoProgress: (time: number[]) => void;
    setPause: (pause: boolean) => void;
    setFullscreen: (fullscreen: boolean) => void;
}

const useControlStore = create<ControlStore>((set) => ({
    videoProgress: [0],
    pause: false,
    fullscreen: false,

    setVideoProgress: (videoProgress) => set(() => ({videoProgress})),
    setPause: (pause) => set(() => ({pause})),
    setFullscreen: (fullscreen) => set(() => ({fullscreen})),
}));

export {useControlStore};