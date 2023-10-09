'use client';

import React, { useState } from 'react';
import { Box } from '@/components/ui/box';
import { Paragraph } from '@/components/ui/paragraph';
import { Flex } from '@/components/ui/flex';
import { Button } from '@/components/ui/button';
import {
  BadgePlusIcon,
  MaximizeIcon,
  MinimizeIcon,
  PauseIcon,
  PlayIcon,
  SkipForwardIcon, SubtitlesIcon,
  VolumeLowIcon,
  VolumeMaxIcon,
  VolumeXIcon,
} from '@/components/ui/icons';
import { useSubtitleStore, useOverLayStore, useRefStore, useVideoStore } from '@/store';
import { Slider } from '@/components/ui/slider';
import { timeConverter, uploadFiles } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Overlay = () => {
  const { videoLink, episode, nextEpisode, addEpisode } = useVideoStore();
  const { addSubtitles} = useSubtitleStore();
  const { videoNode, fullScreenNode } = useRefStore();
  const { videoProgress, overlay, setVideoProgress } = useOverLayStore();

  const [paused, setPaused] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [volume, setVolume] = useState(0.5);

  if (!videoNode || !fullScreenNode) return null;

  const onTogglePlay = () => {
    if (!videoNode.paused) {
      void videoNode.pause();
      setPaused(true);
    } else {
      void videoNode.play();
      setPaused(false);
    }
  };

  const onToggleFullscreen = () => {
    if (document.fullscreenElement === null) void fullScreenNode.requestFullscreen();
    else void document.exitFullscreen();
    setFullscreen(!fullscreen);
  };

  const onProgressChange = (value: number[]) => {
    setVideoProgress(value);
    videoNode.currentTime = (value[0] / 100) * videoNode.duration;
  };

  const onVolumeChange = (value: number[]) => {
    videoNode.volume = value[0];
    setVolume(videoNode.volume);
  };

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
            onClick={onTogglePlay}
            leftSection={paused ? <PlayIcon/> : <PauseIcon stroke={'1.5'}/>}
          />
          {videoLink.length < 2 ? null : <Button onClick={nextEpisode} leftSection={<SkipForwardIcon/>}/>}

          <Flex type={'inline'} gap={'sm'}>
            <Button leftSection={volumeIconRange}/>
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
          <Button size={'icon'}>
            <Label htmlFor="add" leftSection={<BadgePlusIcon/>}/>
            <Input
              accept={'video/*, video/x-matroska'}
              onChange={e => uploadFiles(e, addEpisode)}
              id={'add'}
              multiple={true}/>
          </Button>
          <Button size={'icon'}>
            <Label htmlFor="subtitle" leftSection={<SubtitlesIcon/>}/>
            <Input
              accept={'.vtt, .srt'}
              onChange={e => uploadFiles(e, addSubtitles)}
              id={'subtitle'}
              multiple={true}/>
          </Button>
          <Button onClick={onToggleFullscreen} leftSection={fullscreen ? <MinimizeIcon/> : <MaximizeIcon/>}/>
        </Flex>

      </Flex>
    </Box>
  )
    ;
};

export default Overlay;