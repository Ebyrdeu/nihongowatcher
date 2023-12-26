import {useControlStore, useRefStore} from "@/store";
import {useCallback, useEffect} from "react";
import {Direction} from "@/lib";

export const useProgress = () => {
    const {videoNode} = useRefStore();
    const {setVideoProgress, videoProgress} = useControlStore();

    const onProgressChange = useCallback((value: number[]) => {
        if (videoNode) {
            setVideoProgress(value);
            videoNode.currentTime = (value[0] / 100) * videoNode.duration;
        }
    }, [setVideoProgress, videoNode]);

    const adjustVideoTimeBasedOnKey = useCallback((direction: Direction) => {
        if (videoNode && direction === Direction.DOWN) {
            videoNode.currentTime = Math.max(0, ((videoProgress[0] / 100) * videoNode.duration) - 5);
            return setVideoProgress([(videoNode.currentTime / videoNode.duration) * 100]);
        }

        if (videoNode && direction === Direction.UP) {
            videoNode.currentTime = Math.max(0, ((videoProgress[0] / 100) * videoNode.duration) + 5);
            return setVideoProgress([(videoNode.currentTime / videoNode.duration) * 100]);
        }

    }, [setVideoProgress, videoNode, videoProgress]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft" || event.code === "ArrowLeft") adjustVideoTimeBasedOnKey(Direction.DOWN);
            if (event.key === "ArrowRight" || event.code === "ArrowRight") adjustVideoTimeBasedOnKey(Direction.UP);
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [adjustVideoTimeBasedOnKey, videoProgress]);

    return {
        videoProgress,
        onProgressChange,
    };

};