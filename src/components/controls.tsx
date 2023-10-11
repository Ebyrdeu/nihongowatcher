'use client';

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
import { useVideoStore } from '@/store';
import { uploadVideoFiles } from '@/lib/utils';
import {
  useControlsActivity,
  useFormatVideoTime,
  useProgress,
  useToggleFullscreen,
  useTogglePause,
  useVolume,
} from '@/hooks';

export const Controls = () => {
  const { videoLink, episode, nextEpisode, addEpisode } = useVideoStore();

  const { controls } = useControlsActivity();
  const { pause, onTogglePlay } = useTogglePause();
  const { fullscreen, onToggleFullscreen } = useToggleFullscreen();
  const { onProgressChange, videoProgress } = useProgress();
  const { volume, onVolumeChange, onMuteVolume } = useVolume();
  const videoClock = useFormatVideoTime();

  const instanceOf = (instance: HTMLButtonElement | null) => instance && instance.blur();

  const volumeIconRange = (volume === 0) ? <VolumeXIcon/> : (volume >= 0.1 && volume <= 0.5) ?
    <VolumeLowIcon/> : <VolumeMaxIcon/>;

  return (
    <Box className={`${controls ? 'opacity-1' : 'opacity-0'} transition-opacity duration-700 ease-in-out`}>
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
          onKeyDown={(event) => event.preventDefault()}
        />
      </Box>

      <Flex justify={'between'} specialLayout={'overlay'}>
        <Flex gap={'none'}>
          <Button
            ref={instanceOf}
            onClick={onTogglePlay}
            leftSection={pause ? <PlayIcon/> : <PauseIcon stroke={'1.5'}/>}
          />

          {videoLink.length < 2 ? null :
            <Button ref={instanceOf} onClick={nextEpisode} leftSection={<SkipForwardIcon/>}/>
          }

          <Flex type={'inline'} gap={'sm'}>
            <Button onClick={onMuteVolume} ref={instanceOf} leftSection={volumeIconRange}/>
            <Slider
              onValueChange={onVolumeChange}
              track={'volume'}
              variant={'volume'}
              value={[volume]}
              max={1}
              step={0.1}
              min={0}
              onKeyDown={(event) => event.preventDefault()}
            />
          </Flex>
        </Flex>
        <Flex gap={'none'}>
          <Paragraph>{videoClock}</Paragraph>
          <Button ref={instanceOf} size={'icon'}>
            <Label htmlFor="add" leftSection={<BadgePlusIcon/>}/>
            <Input
              accept={'video/*, video/x-matroska'}
              onChange={e => uploadVideoFiles(e, addEpisode)}
              id={'add'}
              multiple={true}/>
          </Button>
          <Button ref={instanceOf} size={'icon'}>
            <Label htmlFor="subtitle" leftSection={<SubtitlesIcon/>}/>
            <Input
              accept={'.vtt, .srt'}
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

