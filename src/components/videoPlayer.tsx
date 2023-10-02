import React, {useRef} from 'react';
import {Video} from '@/components/ui/video';
import {useLinkStore} from '@/store';
import {Button} from '@/components/ui/button';

/**
 * VideoPlayer component displays a video with optional overlay
 * that becomes visible when the mouse hovers over the video.
 */
const VideoPlayer = () => {
  const {link: videoLink, next: episode, changeNext: changeEpisode} = useLinkStore();
  const ref = useRef<HTMLVideoElement>(null);

  const fullScreen = () => {
    if (ref.current)
    return ref.current.requestFullscreen();
  }

  return (
      <div className={'relative w-1/2 m-auto mt-24'}>
        <Video controls={true} ref={ref} src={videoLink[episode]}
               subtitles={''}/>
        <Button text={'dark'} variant={'dark'} className={'w-full'} onClick={changeEpisode}>Next
          episode</Button>

        <Button text={'dark'} variant={'dark'} className={'w-full'} onClick={fullScreen}>Next
          episode</Button>
      </div>
  );
};

export default VideoPlayer;
