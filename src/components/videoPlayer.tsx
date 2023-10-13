'use client';

import { useCallback } from 'react';
import { Box, Video } from '@/components/ui';
import { useControlStore, useRefStore, useVideoStore } from '@/store';
import { Controls } from '@/components/controls';
import Subtitles from '@/components/subtitles';

export const VideoPlayer = () => {
  const { videoLink, episode } = useVideoStore();

  const { setVideoNode, setFullscreenNode, fullscreenNode, videoNode } = useRefStore();
  const { setVideoProgress, setControls, setPause, setFullscreen } = useControlStore();

  const videoRef = useCallback((node: HTMLVideoElement) => {
    if (node !== null) void setVideoNode(node);
  }, [setVideoNode]);

  const fullscreenRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) void setFullscreenNode(node);
  }, [setFullscreenNode]);

  const onTogglePlay = useCallback(() => {
    if (videoNode) {
      videoNode.paused ? videoNode.play() : videoNode.pause();
      void setPause(videoNode.paused);
    }
  }, [videoNode, setPause]);

  const onToggleFullscreen = useCallback(() => {
    if (fullscreenNode) {
      if (document.fullscreenElement === null) fullscreenNode.requestFullscreen().then(() => void setFullscreen(true));
      else document.exitFullscreen().then(() => void setFullscreen(false));
    }
  }, [fullscreenNode, setFullscreen]);

  const handleTimeUpdate = useCallback(() => {
    if (videoNode) {
      void setVideoProgress([(videoNode.currentTime / videoNode.duration) * 100]);
    }
  }, [setVideoProgress, videoNode]);

  return (
    <Box
      ref={fullscreenRef}
      variant={'center'}
      onMouseEnter={() => setControls(true)}
      onMouseLeave={() => setControls(false)}
    >
      <Video
        onClick={onTogglePlay}
        onDoubleClick={onToggleFullscreen}
        onLoadedData={e => e.currentTarget.volume = 0.1}
        onTimeUpdate={handleTimeUpdate}
        ref={videoRef}
        src={videoLink[episode]?.link}
      />
      <Subtitles/>
      <Controls/>
    </Box>
  );
};