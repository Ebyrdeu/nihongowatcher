'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRefStore } from '@/store';

export function useToggleFullscreen () {
  const [fullscreen, setFullscreen] = useState(false);
  const { fullScreenNode } = useRefStore();

  const onToggleFullscreen = useCallback(() => {
    if (fullScreenNode) {
      if (document.fullscreenElement === null) fullScreenNode.requestFullscreen().then(() => setFullscreen(true));
      else document.exitFullscreen().then(() => setFullscreen(false));
    }
  }, [fullScreenNode]);

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
  }, [onToggleFullscreen]);

  return {
    fullscreen,
    onToggleFullscreen,
  };
}
