'use client';

import { useState } from 'react';
import { Box, Button, Flex, Input, Label, Paragraph, Slider } from '@/components/ui';
import {
  BadgePlusIcon,
  MaximizeIcon,
  MinimizeIcon,
  PauseIcon,
  PlayIcon,
  SkipForwardIcon,
  SubtitlesIcon,
  VolumeLowIcon,
  VolumeMaxIcon,
  VolumeXIcon,
} from '@/components/ui/icons';
import { useOverLayStore, useRefStore, useSubtitleStore, useVideoStore } from '@/store';
import { timeConverter, uploadFiles } from '@/lib/utils';
import { useToggleFullscreen, useTogglePause } from '@/hooks';

export const Controls = () => {
  const { videoLink, episode, nextEpisode, addEpisode } = useVideoStore();
  const { addSubtitles } = useSubtitleStore();
  const { videoNode } = useRefStore();
  const { videoProgress, overlay, setVideoProgress } = useOverLayStore();

  const { paused, onTogglePlay } = useTogglePause();
  const { fullscreen, onToggleFullscreen } = useToggleFullscreen();
  const [volume, setVolume] = useState(0.5);

  const onProgressChange = (value: number[]) => {
    setVideoProgress(value);
    if (videoNode) videoNode.currentTime = (value[0] / 100) * videoNode.duration;
  };

  const onVolumeChange = (value: number[]) => {
    if (videoNode) {
      videoNode.volume = value[0];
      setVolume(videoNode.volume);
    }
  };

  const instanceOf = (instance: HTMLButtonElement | null) => instance && instance.blur();

  const volumeIconRange = (volume === 0) ? <VolumeXIcon/> : (volume >= 0.1 && volume <= 0.5) ?
    <VolumeLowIcon/> : <VolumeMaxIcon/>;

  return (
    <Box className={`${overlay ? 'opacity-1' : 'opacity-0'} transition duration-300 ease-in-out `}>
      <Box asChild specialLayout={'overlay'}>
        <Paragraph className={'p-2'}>{videoLink[episode].name}</Paragraph>
      </Box>

      <Box asChild className={'absolute bottom-10 left-0 right-0'}>
        <Slider
          onValueChange={onProgressChange}
          track={'progress'}
          variant={'progress'}
          step={0.1}
          min={0}
          max={100}
          value={videoProgress}
        />
      </Box>


      <Flex justify={'between'} specialLayout={'overlay'}>
        <Flex gap={'none'}>
          <Button
            ref={instanceOf}
            onClick={onTogglePlay}
            leftSection={paused ? <PlayIcon/> : <PauseIcon stroke={'1.5'}/>}
          />
          {videoLink.length < 2 ? null : <Button onClick={nextEpisode} leftSection={<SkipForwardIcon/>}/>}

          <Flex type={'inline'} gap={'sm'}>
            <Button ref={instanceOf} leftSection={volumeIconRange}/>
            <Slider onValueChange={onVolumeChange}
                    track={'volume'}
                    variant={'volume'}
                    value={[volume]}
                    max={1}
                    step={0.1}
                    min={0}
            />
          </Flex>
        </Flex>
        <Flex gap={'none'}>
          <Paragraph>{timeConverter(videoNode)}</Paragraph>
          <Button ref={instanceOf} size={'icon'}>
            <Label htmlFor="add" leftSection={<BadgePlusIcon/>}/>
            <Input
              accept={'video/*, video/x-matroska'}
              onChange={e => uploadFiles(e, addEpisode)}
              id={'add'}
              multiple={true}/>
          </Button>
          <Button ref={instanceOf} size={'icon'}>
            <Label htmlFor="subtitle" leftSection={<SubtitlesIcon/>}/>
            <Input
              accept={'.vtt, .srt'}
              onChange={e => uploadFiles(e, addSubtitles)}
              id={'subtitle'}
              multiple={true}/>
          </Button>
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

