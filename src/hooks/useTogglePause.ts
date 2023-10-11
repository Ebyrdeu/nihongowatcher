'use client';

import { useCallback, useEffect } from 'react';
import { useControlStore, useRefStore } from '@/store';

export function useTogglePause () {
  const { videoNode } = useRefStore();
  const { setPause, pause } = useControlStore();

  const onTogglePlay = useCallback(() => {
    if (videoNode) {
      videoNode.paused ? videoNode.play() : videoNode.pause();
      setPause(videoNode.paused);
    }
  }, [videoNode, setPause]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => (event.key === ' ' || event.code === 'Space') && onTogglePlay();

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onTogglePlay]);

  return {
    pause,
    onTogglePlay,
  };
}