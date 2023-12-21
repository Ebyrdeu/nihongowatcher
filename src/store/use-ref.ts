"use client";

import {create} from "zustand";

interface RefStore {
    videoNode: HTMLVideoElement | null;
    fullscreenNode: HTMLDivElement | null;
    setVideoNode: (videoNode: HTMLVideoElement) => void;
    setFullscreenNode: (fullscreenNode: HTMLDivElement) => void;
}

const useRefStore = create<RefStore>((set) => ({
    videoNode: null,
    fullscreenNode: null,
    setVideoNode: (videoNode) => set(() => ({videoNode})),
    setFullscreenNode: (fullscreenNode) => set(() => ({fullscreenNode})),
}));

export {useRefStore};