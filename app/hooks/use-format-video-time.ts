import {useRefStore} from "@/store";
import {formatTime} from "@/lib";

export const useFormatVideoTime = () => {
    const {videoNode} = useRefStore();


    return formatTime(!videoNode ? 0 : videoNode.duration - videoNode.currentTime);
};


