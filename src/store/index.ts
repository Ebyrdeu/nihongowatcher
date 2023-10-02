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

const useLinkStore = create<LinkStore>((set) => ({
  link: [],
  next: 0,
  changeNext: () => set(s => {
    if (s.next > s.link.length) return {next: 0};
    return {next: s.next + 1};
  }),
  changeLink: (link: string[]) => set(s => ({link: [...s.link, ...link]})),
}));

export {useLinkStore};


