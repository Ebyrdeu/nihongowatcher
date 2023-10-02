import { create } from 'zustand';

/**
 * Interface representing the LinkStore state.
 */
interface LinkStore {
  link: string;
  changeLink: (link: string) => void;
}

/**
 * Custom hook for managing and updating link state.
 */
const useLinkStore = create<LinkStore>((set) => ({
  link: '',
  changeLink: (link: string) => set(() => ({ link: link })),
}));

export { useLinkStore };
