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
  SkipForwardIcon,
  SubtitlesIcon,
  VolumeIcon,
} from '@/components/ui/icons';
import { useLinkStore, useOverLayStore, useRefStore } from '@/store';
import { Slider } from '@/components/ui/slider';
import { uploadFiles } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Overlay = () => {
  const { videoLink, episode, nextEpisode, addEpisode } = useLinkStore();
  const { videoNode } = useRefStore();
  const { videoProgress, setVideoProgress } = useOverLayStore();

  const [paused, setPaused] = useState(false);

  if (videoNode === null) return null;

  const onTogglePlay = () => {
    if (!videoNode.paused) {
      void videoNode.pause();
      setPaused(true);
    } else {
      void videoNode.play();
      setPaused(false);
    }
  };

  const onProgressChange = (value: number[]) => {
    setVideoProgress(value);
    videoNode.currentTime = (value[0] / 100) * videoNode.duration;
  };

  return (
    <Box className={`${true ? 'opacity-1' : 'opacity-0'} transition duration-300 ease-in-out `}>
      <Box asChild specialLayout={'overlay'}>
        <Paragraph className={'p-2'}>{videoLink[episode].name}</Paragraph>
      </Box>

      <Box className={'absolute bottom-10 left-0 right-0'}>
        <Slider
          onValueChange={onProgressChange}
          track={'progress'}
          variant={'progress'}
          min={0}
          max={100}
          step={1}
          value={videoProgress}
        />
      </Box>


      <Flex justify={'between'} specialLayout={'overlay'}>
        <Flex gap={'none'}>
          <Button
            onClick={onTogglePlay}
            leftSection={paused ? <PlayIcon/> : <PauseIcon stroke={'1.5'}/>}/>

          {videoLink.length < 2 ? null : <Button onClick={nextEpisode} leftSection={<SkipForwardIcon/>}/>}


          <Flex type={'inline'} gap={'sm'}>
            <Button leftSection={<VolumeIcon/>}/>
            <Slider track={'volume'} variant={'volume'} max={100} step={5} min={0}/>
          </Flex>
        </Flex>
        <Flex gap={'none'}>
          <Button size={'icon'}>
            <Label htmlFor="add" leftSection={<BadgePlusIcon/>}/>
            <Input
              accept={'video/*, video/x-matroska'}
              onChange={e => uploadFiles(e, addEpisode)}
              id={'add'}
              multiple={true}/>
          </Button>
          <Button leftSection={<SubtitlesIcon/>}/>
          <Button leftSection={true ? <MinimizeIcon/> : <MaximizeIcon/>}/>
        </Flex>

      </Flex>
    </Box>
  )
    ;
};

export default Overlay;