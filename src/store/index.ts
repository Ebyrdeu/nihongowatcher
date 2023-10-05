import { create } from 'zustand';

/**
 * Interface representing the LinkStore state.
 */
interface LinkStore {
  link: { name: string, link: string }[];
  next: number,
  changeNext: () => void;
  changeLink: (link: LinkDataProps[]) => void;
}

interface LinkDataProps {
  name: string,
  link: string
}

interface OverlayStore {
  isPaused: boolean;
  isFullscreen: boolean;
  isMuted: boolean;
  isVolume: boolean;
  isOverlay: boolean;
  setVolumeScale: (volume: string) => number;
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
    if (s.link.length - 1 === s.next) return { next: 0 };
    return { next: s.next + 1 };
  }),
  changeLink: (link: LinkDataProps[]) => set(
    s => ({
      link: [...s.link, ...link].sort((a, b) => a.name.localeCompare(b.name)).map(value => ({
        name: value.name.replace(/\[[^\]]*]|\.\w+$/g, ''),
        link: value.link,
      })),
    })),
}));

const useOverLayStore = create<OverlayStore>((set) => ({
  isPaused: false,
  isFullscreen: false,
  isMuted: false,
  isVolume: false,
  isOverlay: false,
  setPaused: (paused) => set(() => ({ isPaused: paused })),
  setFullscreen: (fullscreen) => set(() => ({ isFullscreen: fullscreen })),
  setMute: (mute) => set(() => ({ isMuted: mute })),
  setVolume: (volume) => set(() => ({ isVolume: volume })),
  setOverlay: (overlay) => set(() => ({ isOverlay: overlay })),
  setVolumeScale: (volume) => Math.min(100, Math.max(0, Number.parseFloat(volume))) / 100,
}));

export { useLinkStore, useOverLayStore, type LinkDataProps };


