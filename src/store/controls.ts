'use client';

import {create} from 'zustand';

interface ControlStore {
  videoProgress: number[];
  controls: boolean;
  pause: boolean;
  fullscreen: boolean,
  setVideoProgress: (time: number[]) => void;
  setControls: (controls: boolean) => void;
  setPause: (pause: boolean) => void;
  setFullscreen: (fullscreen: boolean) => void;
}

const useControlStore = create<ControlStore>((set) => ({
  videoProgress: [0],
  controls: false,
  pause: false,
  fullscreen: false,

  setVideoProgress: (videoProgress) => set(() => ({ videoProgress })),
  setControls: (controls) => set(() => ({ controls })),
  setPause: (pause) => set(() => ({ pause })),
  setFullscreen: (fullscreen) => set(() => ({ fullscreen })),
}));

export { useControlStore };