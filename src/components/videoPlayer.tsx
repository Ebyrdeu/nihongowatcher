'use client';

import React, { useCallback } from 'react';
import { Video } from '@/components/ui/video';
import { useOverLayStore, useRefStore, useSubtitleStore, useVideoStore } from '@/store';
import { Box } from '@/components/ui/box';
import Overlay from '@/components/overlay';

const VideoPlayer = () => {
  const { videoLink, episode } = useVideoStore();
  const { subtitleLink } = useSubtitleStore();

  const { setVideoNode, setFullscreenNode } = useRefStore();
  const { setVideoProgress, setOverlay } = useOverLayStore();

  const videoRef = useCallback((node: HTMLVideoElement) => {
    if (node !== null) void setVideoNode(node);
  }, [setVideoNode]);

  const fullscreenRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) void setFullscreenNode(node);
  }, [setFullscreenNode]);

  return (
    <Box ref={fullscreenRef} variant={'center'}>
      <Box
        onMouseEnter={() => setOverlay(true)}
        onMouseLeave={() => setOverlay(false)}
      >
        <Video
          onTimeUpdate={({ currentTarget }) => setVideoProgress(
            [(currentTarget.currentTime / currentTarget.duration) * 100])}
          ref={videoRef}
          src={videoLink[episode]?.link}
          subtitles={subtitleLink}
        />

        <Overlay/>

      </Box>
    </Box>
  );
};

export default VideoPlayer;