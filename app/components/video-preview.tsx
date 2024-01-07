import React, {ElementRef, useEffect, useRef} from "react";
import {HoverCard, HoverCardArrow, HoverCardContent, HoverCardTrigger, Paragraph} from "@/components/ui";
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
            <HoverCardContent sideOffset={20} className={"w-60 relative p-0.5"}>
                <Snapshot/>
                <Paragraph
                    style={{textShadow: "0 0 2px #000"}}
                    className={"absolute bottom-0.5 inset-x-0 text-white text-center text-xl"}>{clock}</Paragraph>
                <HoverCardArrow className={"backdrop-blur-xl fill-accent-content/30"}/>
            </HoverCardContent>
        </HoverCard>
    );
};


const Snapshot = () => {
    const {videoLink, video} = useVideoStore();
    const {positioning} = useSliderStore();

    const snapshotVideoRef = useRef<ElementRef<"video">>(null);
    const canvasRef = useRef<ElementRef<"canvas">>(null);

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
            <canvas className={"w-full h-full rounded-md object-cover"} ref={canvasRef}/>
        </>
    );
};