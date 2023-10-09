'use client';

import * as Store from 'zustand';

interface RefStore {
  videoNode: HTMLVideoElement | null;
  fullScreenNode: HTMLDivElement | null;
  setVideoNode: (node: HTMLVideoElement) => void;
  setFullscreenNode: (node: HTMLDivElement) => void;
}

const useRefStore = Store.create<RefStore>((set) => ({
  videoNode: null,
  fullScreenNode: null,
  setVideoNode: (node) => set(() => ({ videoNode: node })),
  setFullscreenNode: (node) => set(() => ({ fullScreenNode: node })),
}));

export { useRefStore };