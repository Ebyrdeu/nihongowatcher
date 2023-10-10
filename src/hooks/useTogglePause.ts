import { useCallback, useEffect, useState } from 'react';
import { useRefStore } from '@/store';

export function useTogglePause () {
  const { videoNode } = useRefStore();
  const [paused, setPaused] = useState(false);

  const onTogglePlay = useCallback(() => {
    if (videoNode) {
      videoNode.paused ? videoNode.play() : videoNode.pause();
      setPaused(videoNode.paused);
    }
  }, [videoNode, setPaused]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => (event.key === ' ' || event.code === 'Space') && onTogglePlay();

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onTogglePlay]);

  return {
    paused,
    onTogglePlay,
  };
}