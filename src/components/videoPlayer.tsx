'use client';

import { useCallback } from 'react';
import { Box, Video } from '@/components/ui';
import { useControlStore, useRefStore, useVideoStore } from '@/store';
import { Controls } from '@/components/controls';

export const VideoPlayer = () => {
  const { videoLink, episode } = useVideoStore();

  const { setVideoNode, setFullscreenNode, fullScreenNode, videoNode } = useRefStore();
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
      setPause(videoNode.paused);
    }
  }, [videoNode, setPause]);

  const onToggleFullscreen = useCallback(() => {
    if (fullScreenNode) {
      if (document.fullscreenElement === null) fullScreenNode.requestFullscreen().then(() => setFullscreen(true));
      else document.exitFullscreen().then(() => setFullscreen(false));
    }
  }, [fullScreenNode]);

  return (
    <Box ref={fullscreenRef} variant={'center'}>
      <Box
        onClick={onTogglePlay}
        onDoubleClick={onToggleFullscreen}
        onMouseEnter={() => setControls(true)}
        onMouseLeave={() => setControls(false)}
      >
        <Video
          onLoadedData={e => e.currentTarget.volume = 0.5}
          onTimeUpdate={({ currentTarget }) => setVideoProgress(
            [(currentTarget.currentTime / currentTarget.duration) * 100])}
          ref={videoRef}
          src={videoLink[episode]?.link}
        />

        <Controls/>

      </Box>
    </Box>
  );
};