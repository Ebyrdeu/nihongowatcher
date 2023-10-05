import {create} from 'zustand';

/**
 * Interface representing the LinkStore state.
 */
interface LinkStore {
  link: string[];
  next: number,
  changeNext: () => void;
  changeLink: (link: string[]) => void;
}

interface OverlayStore {
  isPaused: boolean;
  isFullscreen: boolean;
  isMuted: boolean
  isVolume: boolean
  isOverlay: boolean
  setPaused: (paused: boolean) => void;
  setFullscreen: (fullscreen: boolean) => void;
  setMute: (mute: boolean) => void;
  setVolume: (volume: boolean) => void;
  setOverlay: (overlay: boolean) => void;
}

const useLinkStore = create<LinkStore>((set) => ({
  link: [],
  next: 0,
  changeNext: () => set(s => {
    if (s.next > s.link.length) return {next: 0};
    return {next: s.next + 1};
  }),
  changeLink: (link: string[]) => set(s => ({link: [...s.link, ...link]})),
}));

const useOverLayStore = create<OverlayStore>((set) => ({
  isPaused: true,
  isFullscreen: false,
  isMuted: true,
  isVolume: false,
  isOverlay: false,

  setPaused: (paused) => set(() => ({isPaused: paused})),
  setFullscreen: (fullscreen) => set(() => ({isFullscreen: fullscreen})),
  setMute: (mute) => set(() => ({isMuted: mute})),
  setVolume: (volume) => set(() => ({isVolume: volume})),
  setOverlay: (overlay) => set(() => ({isOverlay: overlay})),
}));

export {useLinkStore, useOverLayStore};


