'use client';

import * as Store from 'zustand';

interface SubtitleStore {
  subtitleLink: SubtitleDataProps[];
  addSubtitles: (link: SubtitleDataProps[]) => void;
}

interface SubtitleDataProps {
  name: string,
  link: string
}

const useSubtitleStore = Store.create<SubtitleStore>((set) => ({
  subtitleLink: [],
  addSubtitles: (link: SubtitleDataProps[]) => set(
    s => ({
      subtitleLink: [...s.subtitleLink, ...link].sort((a, b) => a.name.localeCompare(b.name)).map(value => ({
        name: value.name.replace(/\[[^\]]*]|\.\w+$/g, ''),
        link: value.link,
      })),
    })),
}));

export { useSubtitleStore, type SubtitleDataProps };