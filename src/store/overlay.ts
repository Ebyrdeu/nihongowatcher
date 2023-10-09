'use client';

import * as Store from 'zustand';

interface OverlayStore {
  videoProgress: number[];
  overlay: boolean;

  setVideoProgress: (time: number[]) => void;
  setOverlay: (show: boolean) => void;
}

const useOverLayStore = Store.create<OverlayStore>((set) => ({
  videoProgress: [0],
  overlay: false,
  setVideoProgress: (time) => set(() => ({ videoProgress: time })),
  setOverlay: (show) => set(() => ({ overlay: show })),
}));

export { useOverLayStore };