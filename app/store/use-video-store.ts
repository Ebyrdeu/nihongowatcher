import {create} from "zustand";

interface VideoStore {
    videoLink: VideoDataProps[];
    video: number,
    nextVideo: () => void;
    setVideoNumber: (video: number) => void;
    addVideo: (link: VideoDataProps[]) => void;
}

interface VideoDataProps {
    name: string,
    link: string
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
            const combinedLinks = [...s.videoLink, ...link]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(value => ({
                    name: value.name.replace(/\[[^\]]*]|\.\w+$|\([^)]*\)/g, ""),
                    link: value.link,
                }));

            const uniqueLinks = combinedLinks
                .filter((value, index, self) =>
                    index === self.findIndex((t) => t.name === value.name));

            return {videoLink: uniqueLinks};
        },
    ),

}));

export {useVideoStore, type VideoDataProps};