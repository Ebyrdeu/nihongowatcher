import {
    Box,
    Button,
    Flex,
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
    Input,
    Label,
    Paragraph,
    Slider,
} from "@/components/ui";
import {
    AddSubtitlesIcon,
    AddVideoIcon,
    BackwardTenSecond,
    ForwardTenSecond,
    MaximizeIcon,
    MinimizeIcon,
    PauseIcon,
    PlayIcon,
    SkipForwardIcon,
    VolumeLowIcon,
    VolumeMaxIcon,
    VolumeXIcon,
} from "@/components/ui/icons";
import {useSubtitleStore, useVideoStore} from "@/store";
import {instanceOf, SliderControls, SubtitleParser, VideoParser} from "@/lib";
import {useFormatVideoTime, useProgress, userVolume, useToggleFullscreen, useTogglePause} from "@/hooks";
import React from "react";
import {VideoList} from "@/components/video-list";

export const Controls = () => {
    const {videoLink, video, nextVideo, addVideo} = useVideoStore();

    const {pause, onTogglePlay} = useTogglePause();
    const {fullscreen, onToggleFullscreen} = useToggleFullscreen();
    const {onProgressChange, videoProgress, jumpToTenSeconds} = useProgress();
    const {volume, onVolumeChange, onMuteVolume} = userVolume();
    const videoClock = useFormatVideoTime();
    const {setSubtitles, setOffset} = useSubtitleStore();

    const volumeIconRange = (volume === 0) ? <VolumeXIcon/> : (volume > 0 && volume < 0.5) ?
        <VolumeLowIcon/> : <VolumeMaxIcon/>;

    return (
        <Box className={"absolute bottom-0 left-0 right-0 pl-8 pr-8"}
             style={{backgroundImage: "linear-gradient(0deg,rgba(0,0,0,.3) 0,transparent)"}}>
            <Flex className={"pb-9"} gap={"md"} direction={"col"} justify={"start"} align={"between"}>
                <Flex align={"center"}>
                    <Slider
                        onValueChange={onProgressChange}
                        track={"progress"}
                        variant={"progress"}
                        step={0.1}
                        min={0}
                        max={100}
                        value={videoProgress}
                        onKeyDown={(event) => event.preventDefault()}
                    />
                    <Paragraph style={{textShadow: "0 0 7px #000"}}
                               className={"text-white"}>{videoClock.includes("NaN") ? "00:00" : videoClock}</Paragraph>
                </Flex>
                <Flex justify={"between"}>
                    <Flex gap={"lg"}>
                        <Button
                            ref={instanceOf}
                            onClick={onTogglePlay}
                            leftSection={pause ? <PlayIcon/> : <PauseIcon/>}
                        />

                        <Button
                            ref={instanceOf}
                            onClick={() => jumpToTenSeconds(SliderControls.BACKWARD_VIDEO)}
                            leftSection={<BackwardTenSecond/>}
                        />

                        <Button
                            ref={instanceOf}
                            onClick={() => jumpToTenSeconds(SliderControls.FORWARD_VIDEO)}
                            leftSection={<ForwardTenSecond/>}
                        />

                        <Flex
                            type={"inline"}
                            gap={"sm"}
                        >
                            <HoverCard openDelay={0} closeDelay={0}>
                                <HoverCardTrigger asChild>
                                    <Button onClick={onMuteVolume} ref={instanceOf} leftSection={volumeIconRange}/>
                                </HoverCardTrigger>
                                <HoverCardContent sideOffset={-5} className={"controls w-fit"}>
                                    <Slider
                                        onValueChange={onVolumeChange}
                                        orientation={"vertical"}
                                        isVertical={true}
                                        variant={"volume"}
                                        value={[volume]}
                                        max={1}
                                        step={0.01}
                                        min={0}
                                        onKeyDown={(event) => event.preventDefault()}
                                    />
                                </HoverCardContent>
                            </HoverCard>
                        </Flex>

                        <Input
                            onChange={e => {
                                const value = e.currentTarget.value;
                                let valueOfFloat = parseFloat(value);

                                if (!isNaN(valueOfFloat)) valueOfFloat = parseFloat(valueOfFloat.toFixed(2))
                                else valueOfFloat = 0.00;
                                setOffset(valueOfFloat)
                            }}
                            variant={"offset"}
                            type={"text"}
                            placeholder={"±0.00"}/>

                    </Flex>
                    <Paragraph className={"text-[#fff] p-2 text-3xl truncate "}>{videoLink[video].name}</Paragraph>
                    <Flex gap={"lg"}>

                        {videoLink.length > 1 && (
                            <>
                                <Button ref={instanceOf}
                                        onClick={nextVideo}
                                        leftSection={<SkipForwardIcon/>}
                                />
                                <VideoList/>
                            </>
                        )}

                        <Button ref={instanceOf} size={"icon"}>
                            <Label variant={"icon"} htmlFor="subtitle" leftSection={<AddSubtitlesIcon/>}/>
                            <Input
                                accept={".srt, .vtt,  .ass"}
                                id={"subtitle"}
                                onChange={e => SubtitleParser.upload(e, setSubtitles)}
                                multiple={true}/>
                        </Button>

                        <Button ref={instanceOf} size={"icon"}>
                            <Label variant={"icon"} htmlFor="add" leftSection={<AddVideoIcon/>}/>
                            <Input
                                accept={"video/*, video/x-matroska"}
                                onChange={e => VideoParser.upload(e, addVideo)}
                                id={"add"}
                                multiple={true}/>
                        </Button>

                        <Button ref={instanceOf}
                                onClick={onToggleFullscreen}
                                leftSection={fullscreen ? <MinimizeIcon/> : <MaximizeIcon/>}
                        />
                    </Flex>

                </Flex>
            </Flex>
        </Box>
    );
};

