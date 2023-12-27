import {useCallback, useEffect} from "react";
import {useControlStore, useRefStore} from "@/store";
import {useSubtitleStore} from "@/store/use-subtitle-store";

export const useTogglePause = () => {
    const {videoNode} = useRefStore();
    const {setPause, pause} = useControlStore();
    const {isMoused} = useSubtitleStore();

    const onTogglePlay = useCallback(() => {
        if (videoNode) {
            videoNode.paused ? videoNode.play() : videoNode.pause();
            setPause(videoNode.paused);
        }
    }, [videoNode, setPause]);

    const onMouseOver = useCallback(() => {
        if (videoNode) {
            !isMoused ? videoNode.play() : videoNode.pause();
            setPause(videoNode.paused);
        }
    }, [videoNode, isMoused]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => (event.key === " " || event.code === "Space") && onTogglePlay();

        onMouseOver();

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onTogglePlay, isMoused]);

    return {
        pause,
        onTogglePlay,
    };
};