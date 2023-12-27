import {useCallback, useEffect, useState} from "react";
import {useRefStore} from "@/store";
import {Direction} from "@/lib";

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

    const adjustVolumeBasedOnKey = useCallback((direction: Direction) => {
        if (videoNode && direction === Direction.LEFT) {
            const res = videoNode.volume < 0.1 ? videoNode.volume = 0 : videoNode.volume -= 0.05;
            return setVolume(Number(res.toFixed(2)));
        }

        if (videoNode && direction === Direction.RIGHT) {
            const res = videoNode.volume > 0.9 ? videoNode.volume = 1 : videoNode.volume += 0.05;
            return setVolume(Number(res.toFixed(2)));
        }

    }, [videoNode]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "m" || event.code === "m") onMuteVolume();
            if (event.key === "ArrowDown" || event.code === "ArrowDown") adjustVolumeBasedOnKey(Direction.LEFT);
            if (event.key === "ArrowUp" || event.code === "ArrowUp") adjustVolumeBasedOnKey(Direction.RIGHT);
        };

        const handleWheel = (event: WheelEvent) => {
            if (event.deltaY === 100) adjustVolumeBasedOnKey(0);
            if (event.deltaY === -100) adjustVolumeBasedOnKey(1);
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("wheel", handleWheel);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("wheel", handleWheel);
        };
    }, [adjustVolumeBasedOnKey, onMuteVolume]);

    return {
        volume,
        onVolumeChange,
        onMuteVolume,
    };
};