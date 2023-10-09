'use client';

import * as Store from 'zustand';

interface VideoStore {
  videoLink: VideoDataProps[];
  episode: number,
  nextEpisode: () => void;
  addEpisode: (link: VideoDataProps[]) => void;
}

interface VideoDataProps {
  name: string,
  link: string
}

const useVideoStore = Store.create<VideoStore>((set) => ({
  videoLink: [],
  episode: 0,
  nextEpisode: () => set(s => {
    if (s.videoLink.length - 1 === s.episode) return { episode: 0 };
    return { episode: s.episode + 1 };
  }),
  addEpisode: (link: VideoDataProps[]) => set(
    s => ({
      videoLink: [...s.videoLink, ...link].sort((a, b) => a.name.localeCompare(b.name)).map(value => ({
        name: value.name.replace(/\[[^\]]*]|\.\w+$/g, ''),
        link: value.link,
      })),
    })),
}));

export { useVideoStore, type VideoDataProps };