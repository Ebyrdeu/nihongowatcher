import { useCallback, useEffect, useState } from 'react';
import { useRefStore } from '@/store';

export function useToggleFullscreen () {
  const [fullscreen, setFullscreen] = useState(false);
  const { fullScreenNode } = useRefStore();

  const onToggleFullscreen = useCallback(() => {
    if (fullScreenNode) {
      document.fullscreenElement === null ? fullScreenNode.requestFullscreen() : document.exitFullscreen();
      setFullscreen(!fullscreen);
    }
  }, [fullScreenNode, setFullscreen, fullscreen]);

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'f' || event.code === 'f') onToggleFullscreen();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };

  }, [onToggleFullscreen]);

  return {
    fullscreen,
    onToggleFullscreen,
  };
}