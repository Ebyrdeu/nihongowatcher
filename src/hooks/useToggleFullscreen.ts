'use client';

import { useCallback, useEffect } from 'react';
import { useControlStore, useRefStore } from '@/store';

export function useToggleFullscreen () {
  const { fullscreenNode } = useRefStore();
  const { fullscreen, setFullscreen } = useControlStore();

  const onToggleFullscreen = useCallback(() => {
    if (fullscreenNode) {
      if (document.fullscreenElement === null) fullscreenNode.requestFullscreen().then(() => setFullscreen(true));
      else document.exitFullscreen().then(() => setFullscreen(false));
    }
  }, [fullscreenNode, setFullscreen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === 'f' || event.code === 'f')) onToggleFullscreen();
    };

    const handleFullscreenChange = () => setFullscreen(!!document.fullscreenElement);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onToggleFullscreen, setFullscreen]);

  return {
    fullscreen,
    onToggleFullscreen,
  };
}
