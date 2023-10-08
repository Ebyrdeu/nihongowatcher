'use client';

import React, { useCallback } from 'react';
import { Video } from '@/components/ui/video';
import { useLinkStore, useOverLayStore, useRefStore } from '@/store';
import { Box } from '@/components/ui/box';
import Overlay from '@/components/overlay';

const VideoPlayer = () => {
  const { videoLink, episode } = useLinkStore();
  const { setVideoNode } = useRefStore();
  const { setVideoProgress } = useOverLayStore();

  const videoRef = useCallback((node: HTMLVideoElement) => {
    if (node !== null) {
      void setVideoNode(node);
    }
  }, []);



  return (
    <Box
      ref={null}
      variant={'center'}>
      <Box>
        <Video
          onTimeUpdate={({currentTarget}) =>   setVideoProgress([(currentTarget.currentTime / currentTarget.duration) * 100])}
          ref={videoRef}
          src={videoLink[episode]?.link}
          subtitles={''}
        />
        <Overlay/>
      </Box>
    </Box>
  );
};

export default VideoPlayer;