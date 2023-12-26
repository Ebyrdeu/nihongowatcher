import React, {useCallback} from "react";
import {Box, Video} from "@/components/ui";
import {useControlStore, useRefStore, useVideoStore} from "@/store";
import {Controls} from "@/components/controls";
import Subtitles from "@/components/subtitles";
import {useSubtitleStore} from "@/store/use-subtitle";

export const VideoPlayer = () => {
    const {videoLink, episode} = useVideoStore();

    const {setVideoNode, setFullscreenNode, fullscreenNode, videoNode} = useRefStore();
    const {setVideoProgress, setPause, setFullscreen} = useControlStore();
    const {setSubtitle} = useSubtitleStore();

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

    const setSubtitlesToCurrentVideoProgress = (event: React.SyntheticEvent<HTMLVideoElement>) => {

        const subtitles = [{
            start: "00:01:59,770",
            end: "00:02:01,730",
            text: "（ヒンメル）　フリーレン。",
        }, {
            start: "00:02:08,710",
            end: "00:02:10,710",
            text: "（フリーレン）　王都が見えてきたね。",
        },
            {
                start: "00:02:10,710",
                end: "00:02:15,680",
                text: "（フリーレン）　王都が見えてきたね。盛り上がっているでしょうね。",
            },
        ];

        const timeToSeconds = (time: string) => {
            const [hours, minutes, seconds] = time.split(":");
            return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds.replace(",", "."));
        };

        const currentTime = event.currentTarget.currentTime;
        let subtitleDisplayed = false;

        subtitles.forEach(subtitle => {
            const start = timeToSeconds(subtitle.start);
            const end = timeToSeconds(subtitle.end);

            if (currentTime >= start && currentTime <= end) {
                setSubtitle(subtitle.text);
                subtitleDisplayed = true;
            }
        });

        if (!subtitleDisplayed) setSubtitle("");

    };

    return (
        <Box ref={fullscreenRef} variant={"center"}>
            <Video
                onClick={onTogglePlay}
                onDoubleClick={onToggleFullscreen}
                onLoadedData={e => e.currentTarget.volume = 0.1}
                onTimeUpdate={e => {
                    handleTimeUpdate();
                    setSubtitlesToCurrentVideoProgress(e);
                }}
                ref={videoRef}
                src={videoLink[episode]?.link}
            />
            <Subtitles/>
            <Controls/>
        </Box>
    );
};

