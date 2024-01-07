import {useControlStore, useRefStore} from "@/store";
import {useCallback, useEffect} from "react";
import {SliderControls} from "@/lib";

export const useProgress = () => {
    const {videoNode} = useRefStore();
    const {setVideoProgress, videoProgress} = useControlStore();

    const onProgressChange = useCallback((value: number[]) => {
        if (videoNode) {
            setVideoProgress(value);
            videoNode.currentTime = (value[0] / 100) * videoNode.duration;
        }
    }, [setVideoProgress, videoNode]);

    const adjustVideoTimeBasedOnKey = useCallback((direction: SliderControls) => {
        if (videoNode && direction === SliderControls.BACKWARD_VIDEO) {
            videoNode.currentTime = Math.max(0, ((videoProgress[0] / 100) * videoNode.duration) - 5);
            return setVideoProgress([(videoNode.currentTime / videoNode.duration) * 100]);
        }

        if (videoNode && direction === SliderControls.FORWARD_VIDEO) {
            videoNode.currentTime = Math.max(0, ((videoProgress[0] / 100) * videoNode.duration) + 5);
            return setVideoProgress([(videoNode.currentTime / videoNode.duration) * 100]);
        }

    }, [setVideoProgress, videoNode, videoProgress]);

    const jumpToTenSeconds = useCallback((direction: SliderControls) => {
        if (videoNode && direction === SliderControls.BACKWARD_VIDEO) {
            videoNode.currentTime = Math.max(0, ((videoProgress[0] / 100) * videoNode.duration) - 10);
            return setVideoProgress([(videoNode.currentTime / videoNode.duration) * 100]);
        }

        if (videoNode && direction === SliderControls.FORWARD_VIDEO) {
            videoNode.currentTime = Math.max(0, ((videoProgress[0] / 100) * videoNode.duration) + 10);
            return setVideoProgress([(videoNode.currentTime / videoNode.duration) * 100]);
        }
    }, [setVideoProgress, videoNode, videoProgress]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft" || event.code === "ArrowLeft") adjustVideoTimeBasedOnKey(SliderControls.BACKWARD_VIDEO);
            if (event.key === "ArrowRight" || event.code === "ArrowRight") adjustVideoTimeBasedOnKey(SliderControls.FORWARD_VIDEO);
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [adjustVideoTimeBasedOnKey, videoProgress]);

    return {
        videoProgress,
        onProgressChange,
        jumpToTenSeconds,
    };

};