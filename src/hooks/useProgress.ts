'use client';

import { useOverLayStore, useRefStore } from '@/store';
import { useCallback, useEffect } from 'react';

export function useProgress () {
  const { videoNode } = useRefStore();
  const { setVideoProgress, videoProgress } = useOverLayStore();

  const onProgressChange = useCallback((value: number[]) => {
    if (videoNode) {
      setVideoProgress(value);
      videoNode.currentTime = (value[0] / 100) * videoNode.duration;
    }
  }, [setVideoProgress, videoNode]);

  const adjustVideoTimeBasedOnKey = useCallback((direction: number) => {
    if (videoNode && direction === 0) {
      videoNode.currentTime = Math.max(0, ((videoProgress[0] / 100) * videoNode.duration) - 5);
      return setVideoProgress([(videoNode.currentTime / videoNode.duration) * 100]);
    }

    if (videoNode && direction === 1) {
      videoNode.currentTime = Math.max(0, ((videoProgress[0] / 100) * videoNode.duration) + 5);
      return setVideoProgress([(videoNode.currentTime / videoNode.duration) * 100]);
    }

  }, [setVideoProgress, videoNode, videoProgress]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.code === 'ArrowLeft') adjustVideoTimeBasedOnKey(0);
      if (event.key === 'ArrowRight' || event.code === 'ArrowRight') adjustVideoTimeBasedOnKey(1);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [adjustVideoTimeBasedOnKey, videoProgress]);

  return {
    videoProgress,
    onProgressChange,
  };

}