import {create} from "zustand";
import {type VideoDataProps, VideoParser} from "@/lib";

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
    addVideo: (link: VideoDataProps[]) => set(s =>
        ({videoLink: VideoParser.toUniqueFiles([...s.videoLink, ...link])})),

}));

export {useVideoStore};