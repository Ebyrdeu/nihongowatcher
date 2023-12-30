import {Box, Button, Flex, Input, Label, Paragraph, Slider} from "@/components/ui";
import {
    AddSubtitlesIcon,
    AddVideoIcon,
    EpisodeListIcon,
    MaximizeIcon,
    MinimizeIcon,
    PauseIcon,
    PlayIcon,
    SkipForwardIcon,
    VolumeLowIcon,
    VolumeMaxIcon,
    VolumeXIcon,
} from "@/components/ui/icons";
import {useListStore, useSubtitleStore, useVideoStore} from "@/store";
import {uploadVideoFiles} from "@/lib";
import {
    useFormatVideoTime,
    useProgress,
    userVolume,
    useToggleFullscreen,
    useTogglePause,
} from "@/hooks";
import React, {useState} from "react";
import {uploadSubtitleFile} from "@/lib/upload-subtitle-file";

export const Controls = () => {
    const [showVolumeBar, setShowVolumeBar] = useState(false);

    const {videoLink, video, nextVideo, addVideo} = useVideoStore();

    const {pause, onTogglePlay} = useTogglePause();
    const {fullscreen, onToggleFullscreen} = useToggleFullscreen();
    const {onProgressChange, videoProgress} = useProgress();
    const {volume, onVolumeChange, onMuteVolume} = userVolume();
    const {setSubtitles} = useSubtitleStore();
    const {setOpen} = useListStore();
    const videoClock = useFormatVideoTime();

    const instanceOf = (instance: HTMLButtonElement | null) => instance && instance.blur();

    const volumeIconRange = (volume === 0) ? <VolumeXIcon/> : (volume > 0 && volume < 0.5) ?
        <VolumeLowIcon/> : <VolumeMaxIcon/>;


    return (
        <Box className={"absolute bottom-0 left-0 right-0 pl-8 pr-8"}
             style={{backgroundImage: "linear-gradient(0deg,rgba(0,0,0,.3) 0,transparent)"}}>
            <Flex className={"py-9"} gap={"md"} direction={"col"} justify={"start"} align={"between"}>
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

                        {videoLink.length < 2 ? null :
                            <Button ref={instanceOf} onClick={nextVideo} leftSection={<SkipForwardIcon/>}/>
                        }

                        <Flex
                            onMouseEnter={() => setShowVolumeBar(true)}
                            onMouseLeave={() => setShowVolumeBar(false)}
                            type={"inline"}
                            gap={"sm"}
                        >
                            <Button onClick={onMuteVolume} ref={instanceOf} leftSection={volumeIconRange}/>
                            <Slider
                                className={`${showVolumeBar ? "opacity-1" : "opacity-0 w-0"} duration-500`}
                                onValueChange={onVolumeChange}
                                track={"volume"}
                                variant={"volume"}
                                value={[volume]}
                                max={1}
                                step={0.01}
                                min={0}
                                onKeyDown={(event) => event.preventDefault()}
                            />
                        </Flex>
                    </Flex>
                    <Paragraph className={"text-[#fff] p-2 text-3xl"}>{videoLink[video].name}</Paragraph>
                    <Flex gap={"lg"}>

                        <Button ref={instanceOf} size={"icon"}>
                            <Label variant={"icon"} htmlFor="add" leftSection={<AddVideoIcon/>}/>
                            <Input
                                accept={"video/*, video/x-matroska"}
                                onChange={e => uploadVideoFiles(e, addVideo)}
                                id={"add"}
                                multiple={true}/>
                        </Button>

                        <Button ref={instanceOf} size={"icon"}>
                            <Label variant={"icon"} htmlFor="subtitle" leftSection={<AddSubtitlesIcon/>}/>
                            <Input
                                accept={".vtt, .srt, .ass"}
                                id={"subtitle"}
                                onChange={e => uploadSubtitleFile(e, setSubtitles)}
                                multiple={true}/>
                        </Button>

                        <Button ref={instanceOf}
                                onClick={setOpen}
                                leftSection={<EpisodeListIcon/>}
                        />

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

