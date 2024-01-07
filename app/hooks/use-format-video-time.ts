import {useRefStore} from "@/store";
import {TimeParser} from "@/lib";

export const useFormatVideoTime = (percentage?: number) => {
    const {videoNode} = useRefStore();


    return percentage ?
        TimeParser.toClock(!videoNode ? 0 : (percentage / 100) * videoNode.duration) :
        TimeParser.toClock(!videoNode ? 0 : videoNode.duration - videoNode.currentTime);
};


