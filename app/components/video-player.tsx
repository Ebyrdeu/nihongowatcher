import React, {useCallback} from "react";
import {Box, Video} from "@/components/ui";
import {useControlStore, useRefStore, useVideoStore} from "@/store";
import {Controls} from "@/components/controls";
import Subtitles from "@/components/subtitles";
import {useIdle, useSubtitle} from "@/hooks";

export const VideoPlayer = () => {
    const isIdle = useIdle();

    const {videoLink, video, nextVideo} = useVideoStore();
    const {setVideoNode, setFullscreenNode, fullscreenNode, videoNode} = useRefStore();
    const {setVideoProgress, setPause, setFullscreen} = useControlStore();
    const {setSubtitlesToCurrentVideoProgress} = useSubtitle();
    const videoRef = useCallback((node: HTMLVideoElement) => {
        if (node !== null) void setVideoNode(node);
    }, [setVideoNode]);

    const fullscreenRef = useCallback((node: HTMLDivElement) => {
        if (node !== null) void setFullscreenNode(node);
    }, [setFullscreenNode]);

    const onTogglePlay = useCallback(() => {
        if (videoNode) {
            videoNode.paused ? videoNode.play() : videoNode.pause();
            void setPause(videoNode.paused);
        }
    }, [videoNode, setPause]);

    const onToggleFullscreen = useCallback(() => {
        if (fullscreenNode) {
            if (document.fullscreenElement === null) fullscreenNode.requestFullscreen().then(() => void setFullscreen(true));
            else document.exitFullscreen().then(() => void setFullscreen(false));
        }
    }, [fullscreenNode, setFullscreen]);

    const handleTimeUpdate = useCallback(() => {
        if (videoNode) {
            void setVideoProgress([(videoNode.currentTime / videoNode.duration) * 100]);
        }
    }, [setVideoProgress, videoNode]);

    const autoPlay = ({currentTarget}: React.SyntheticEvent<HTMLVideoElement>) =>
        (videoLink.length > 0 && currentTarget.currentTime === currentTarget.duration) && nextVideo();

    return (
        <Box className={isIdle ? "cursor-none" : ""}
             ref={fullscreenRef} variant={"center"}>
            <Video
                onClick={onTogglePlay}
                onDoubleClick={onToggleFullscreen}
                onLoadedData={e => e.currentTarget.volume = 0.1}
                onTimeUpdate={e => {
                    handleTimeUpdate();
                    setSubtitlesToCurrentVideoProgress(e);
                    autoPlay(e);
                }}
                ref={videoRef}
                src={videoLink[video]?.link}
            />
            <Subtitles/>

            <div className={`ease-in-out duration-150 ${!isIdle ? "opacity-100" : "opacity-0"}`}>
                <Controls/>
            </div>
        </Box>
    );
};
