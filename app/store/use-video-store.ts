import {create} from "zustand";
import type {VideoDataProps} from "@/lib";

interface VideoStore {
    videoLink: VideoDataProps[];
    video: number,
    nextVideo: () => void;
    setVideoNumber: (video: number) => void;
    addVideo: (link: VideoDataProps[]) => void;
}


const useVideoStore = create<VideoStore>((set) => ({
    videoLink: [],
    video: 0,
    setVideoNumber: (video) => set(() => ({video})),
    nextVideo: () => set(s => {
        if (s.videoLink.length - 1 === s.video) return {video: 0};
        return {video: s.video + 1};
    }),
    addVideo: (link: VideoDataProps[]) => set(
        s => {
            const combinedLinks = [...s.videoLink, ...link].map(value => ({
                name: value.name,
                link: value.link,
            }));

            return {videoLink: combinedLinks};
        },
    ),

}));

export {useVideoStore};