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
  }, [fullScreenNode, setFullscreen]);

  return (
    <Box ref={fullscreenRef} variant={'center'}>
      <Box
        onMouseEnter={() => setControls(true)}
        onMouseLeave={() => setControls(false)}
      >
        <Video
          onClick={onTogglePlay}
          onDoubleClick={onToggleFullscreen}
          onLoadedData={e => e.currentTarget.volume = 0.1}
          onTimeUpdate={({ currentTarget }) => setVideoProgress([(currentTarget.currentTime / currentTarget.duration) * 100])}
          ref={videoRef}
          src={videoLink[episode]?.link}
        />

        <Controls/>

      </Box>
    </Box>
  );
};