'use client';

import { useCallback } from 'react';
import { Box, Video } from '@/components/ui';
import { useOverLayStore, useRefStore, useSubtitleStore, useVideoStore } from '@/store';
import { Controls } from '@/components/controls';

export const VideoPlayer = () => {
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

        <Controls/>

      </Box>
    </Box>
  );
};