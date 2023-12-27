import {Box, Button, Flex, Input, Label, Paragraph, Slider} from "@/components/ui";
import {
    BadgePlusIcon,
    EpisodeListIcon,
    MaximizeIcon,
    MinimizeIcon,
    PauseIcon,
    PlayIcon,
    SkipForwardIcon,
    SubtitlesIcon,
    VolumeLowIcon,
    VolumeMaxIcon,
    VolumeXIcon,
} from "@/components/ui/icons";
import {useVideoStore} from "@/store";
import {uploadVideoFiles} from "@/lib";
import {
    useControlsActivity,
    useFormatVideoTime,
    useProgress,
    userVolume,
    useToggleFullscreen,
    useTogglePause,
} from "@/hooks";
import {useState} from "react";
import {Tooltip} from "@/components/ui/tooltip";
import {uploadSubtitleFile} from "@/lib/upload-subtitle-file";
import {useSubtitleStore} from "@/store/use-subtitle-store";

export const Controls = () => {
    const [showVolumeBar, setShowVolumeBar] = useState(false);

    const {videoLink, episode, nextEpisode, addEpisode} = useVideoStore();

    const {isIdle} = useControlsActivity(1000);
    const {pause, onTogglePlay} = useTogglePause();
    const {fullscreen, onToggleFullscreen} = useToggleFullscreen();
    const {onProgressChange, videoProgress} = useProgress();
    const {volume, onVolumeChange, onMuteVolume} = userVolume();
    const {setSubtitles} = useSubtitleStore();
    const videoClock = useFormatVideoTime();

    const instanceOf = (instance: HTMLButtonElement | null) => instance && instance.blur();

    const volumeIconRange = (volume === 0) ? <VolumeXIcon/> : (volume > 0 && volume < 0.5) ?
        <VolumeLowIcon/> : <VolumeMaxIcon/>;


    return (
        <Box
            className={`${isIdle ? "opacity-1 cursor-default" : "opacity-0 delay-700"} transition-opacity duration-700 ease-in-out`}>
            <Box asChild specialLayout={"overlay"}>
                <Paragraph className={"text-[#fff] p-2 text-3xl"}>{videoLink[episode].name}</Paragraph>
            </Box>

            <Box asChild className={"absolute bottom-12 left-0 right-0"}>
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
            </Box>

            <Flex justify={"between"} specialLayout={"overlay"}>
                <Flex gap={"xs"}>
                    <Button
                        ref={instanceOf}
                        onClick={onTogglePlay}
                        leftSection={pause ? <PlayIcon/> : <PauseIcon/>}
                    />

                    {videoLink.length < 2 ? null :
                        <Button ref={instanceOf} onClick={nextEpisode} leftSection={<SkipForwardIcon/>}/>
                    }

                    <Flex
                        onMouseEnter={() => setShowVolumeBar(true)}
                        onMouseLeave={() => setShowVolumeBar(false)}
                        type={"inline"}
                        gap={"sm"}
                    >
                        <Button onClick={onMuteVolume} ref={instanceOf} leftSection={volumeIconRange}/>
                        <Tooltip value={`${(volume * 100).toFixed(0)}%`}>
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
                        </Tooltip>
                    </Flex>
                    <Paragraph>{videoClock}</Paragraph>
                </Flex>
                <Flex gap={"xs"}>

                    <Button ref={instanceOf} size={"icon"}>
                        <Label htmlFor="add" leftSection={<BadgePlusIcon/>}/>
                        <Input
                            accept={"video/*, video/x-matroska"}
                            onChange={e => uploadVideoFiles(e, addEpisode)}
                            id={"add"}
                            multiple={true}/>
                    </Button>

                    <Button ref={instanceOf} size={"icon"}>
                        <Label htmlFor="subtitle" leftSection={<SubtitlesIcon/>}/>
                        <Input
                            accept={".vtt, .srt"}
                            id={"subtitle"}
                            onChange={e => uploadSubtitleFile(e, setSubtitles)}
                            multiple={true}/>
                    </Button>

                    <Button ref={instanceOf}
                            onClick={onToggleFullscreen}
                            leftSection={<EpisodeListIcon/>}
                    />

                    <Button ref={instanceOf}
                            onClick={onToggleFullscreen}
                            leftSection={fullscreen ? <MinimizeIcon/> : <MaximizeIcon/>}
                    />
                </Flex>

            </Flex>
        </Box>
    )
        ;
};

