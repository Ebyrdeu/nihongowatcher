import {create} from "zustand";

interface SliderStore {
    isHover: boolean,
    positioning: number

    setHover: (isHover: boolean) => void
    setPositioning: (positioning: number) => void;
}

const useSliderStore = create<SliderStore>((set) => ({
    isHover: false,
    positioning: 0,
    setHover: (isHover) => set(() => ({isHover})),
    setPositioning: (positioning) => set(() => ({positioning})),
}));

export {useSliderStore};