'use client';

import * as Store from 'zustand';

interface OverlayStore {
  videoProgress: number[];
  setVideoProgress: (time: number[]) => void;
  setVolumeSclae: (volume: string) => number;
}

const useOverLayStore = Store.create<OverlayStore>((set) => ({
  videoProgress: [0],
  setVideoProgress: (time) => set(() => ({
    videoProgress: time,
  })),
  setVolumeSclae: (volume) => Math.min(100, Math.max(0, Number.parseFloat(volume))) / 100,
}));

export { useOverLayStore };