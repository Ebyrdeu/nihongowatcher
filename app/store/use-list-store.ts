import {create} from "zustand";

interface ListStore {
    isOpen: boolean;
    setOpen: () => void;
}


const useListStore = create<ListStore>((set) => ({
    isOpen: false,
    setOpen: () => set((s) => ({isOpen: !s.isOpen})),
}));

export {useListStore, type ListStore};