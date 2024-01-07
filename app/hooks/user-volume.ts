import {useCallback, useEffect, useState} from "react";
import {useRefStore} from "@/store";
import {SliderControls} from "@/lib";

export const userVolume = () => {
    const {videoNode} = useRefStore();

    const [volume, setVolume] = useState(0.1);
    const [prevValue, setPrevValue] = useState(0.1);

    const onVolumeChange = useCallback((value: number[]) => {
        if (videoNode) {
            videoNode.volume = value[0];
            setVolume(videoNode.volume);
            setPrevValue(videoNode.volume);
        }
    }, [videoNode]);

    const onMuteVolume = useCallback(() => {
        if (videoNode && videoNode.volume !== 0) {
            videoNode.volume = 0;
            return setVolume(videoNode.volume);
        }
        if (videoNode && videoNode.volume === 0) {
            videoNode.volume = prevValue;
            return setVolume(videoNode.volume);
        }
    }, [prevValue, videoNode]);

    const adjustVolumeBasedOnKey = useCallback((direction: SliderControls) => {
        if (videoNode && direction === SliderControls.HIGHER_VOLUME) {
            const res = videoNode.volume < 0.1 ? videoNode.volume = 0 : videoNode.volume -= 0.05;
            return setVolume(Number(res.toFixed(2)));
        }

        if (videoNode && direction === SliderControls.LOWER_VOLUME) {
            const res = videoNode.volume > 0.9 ? videoNode.volume = 1 : videoNode.volume += 0.05;
            return setVolume(Number(res.toFixed(2)));
        }

    }, [videoNode]);


    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "m" || event.code === "m") onMuteVolume();
            if (event.key === "ArrowDown" || event.code === "ArrowDown") adjustVolumeBasedOnKey(SliderControls.HIGHER_VOLUME);
            if (event.key === "ArrowUp" || event.code === "ArrowUp") adjustVolumeBasedOnKey(SliderControls.LOWER_VOLUME);
        };


        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [adjustVolumeBasedOnKey, onMuteVolume]);

    return {
        volume,
        onVolumeChange,
        onMuteVolume,
    };
};
