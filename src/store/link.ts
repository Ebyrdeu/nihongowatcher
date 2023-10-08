'use client';

import * as Store from 'zustand';

interface LinkStore {
  videoLink: LinkDataProps[];
  episode: number,
  nextEpisode: () => void;
  addEpisode: (link: LinkDataProps[]) => void;
}

interface LinkDataProps {
  name: string,
  link: string
}

const useLinkStore = Store.create<LinkStore>((set) => ({
  videoLink: [],
  episode: 0,
  nextEpisode: () => set(s => {
    if (s.videoLink.length - 1 === s.episode) return { episode: 0 };
    return { episode: s.episode + 1 };
  }),
  addEpisode: (link: LinkDataProps[]) => set(
    s => ({
      videoLink: [...s.videoLink, ...link].sort((a, b) => a.name.localeCompare(b.name)).map(value => ({
        name: value.name.replace(/\[[^\]]*]|\.\w+$/g, ''),
        link: value.link,
      })),
    })),
}));

export { useLinkStore, type LinkDataProps };