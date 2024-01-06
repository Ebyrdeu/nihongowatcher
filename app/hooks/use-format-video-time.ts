import {useRefStore} from "@/store";
import {formatTime} from "@/lib";

export const useFormatVideoTime = (percentage?: number) => {
    const {videoNode} = useRefStore();


    return percentage ?
        formatTime(!videoNode ? 0 : (percentage / 100) * videoNode.duration) :
        formatTime(!videoNode ? 0 : videoNode.duration - videoNode.currentTime);
};


