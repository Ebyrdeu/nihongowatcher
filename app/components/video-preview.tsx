import React, {useEffect, useRef} from "react";
import {Flex, HoverCard, HoverCardArrow, HoverCardContent, HoverCardTrigger, Paragraph} from "@/components/ui";
import {useFormatVideoTime} from "@/hooks";
import {useSliderStore, useVideoStore} from "@/store";

export const VideoPreview = () => {
    const {positioning, isHover} = useSliderStore();
    const clock = useFormatVideoTime(positioning);


    return (
        <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
                <div className={"w-12 h-full absolute px-[2%] "}
                     style={{left: `${positioning - 2}%`}}>
                    <div className={`bg-white  ${isHover ? "w-0.5" : "w-0"} h-full controls `}/>
                </div>
            </HoverCardTrigger>
            <HoverCardContent sideOffset={20} className={"controls w-fit"}>
                <Flex direction={"col"} align={"center"} justify={"center"}>
                    <Snapshot/>
                    <Paragraph>{clock}</Paragraph>
                </Flex>
                <HoverCardArrow className={"backdrop-blur-xl fill-accent-content/30"}/>
            </HoverCardContent>
        </HoverCard>
    );
};


const Snapshot = () => {
    const {videoLink, video} = useVideoStore();
    const {positioning} = useSliderStore();

    const snapshotVideoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const snapshotVideo = snapshotVideoRef.current;

        const captureFrame = () => {
            if (snapshotVideo && canvas) {
                const context = canvas.getContext("2d");
                if (context) context.drawImage(snapshotVideo, 0, 0, canvas.width, canvas.height);
            }
        };

        if (snapshotVideo) {
            snapshotVideo.addEventListener("seeked", captureFrame);

            snapshotVideo.src = videoLink[video].link;

            snapshotVideo.addEventListener("loadedmetadata", () => {
                snapshotVideo.currentTime = (positioning / 100) * snapshotVideo.duration;
            });

            return () => {
                snapshotVideo.removeEventListener("seeked", captureFrame);
            };
        }
    }, [videoLink, video, positioning]);


    return (
        <>
            <video className={"hidden"} src={videoLink[video].link} ref={snapshotVideoRef} preload="metadata"/>
            <canvas ref={canvasRef}/>
        </>
    );
};