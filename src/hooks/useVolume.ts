'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRefStore } from '@/store';

export function useVolume () {
  const { videoNode } = useRefStore();

  const [volume, setVolume] = useState(0.5);
  const [prevValue, setPrevValue] = useState(0.5);

  const onVolumeChange = useCallback((value: number[]) => {
    if (videoNode) {
      videoNode.volume = value[0];
      setVolume(videoNode.volume);
      setPrevValue(videoNode.volume);
    }
  }, [videoNode]);

  const onMuteVolume = useCallback(() => {
    if (videoNode && videoNode.volume !== 0) {
      videoNode.volume = 0;
      return setVolume(videoNode.volume);
    }
    if (videoNode && videoNode.volume === 0) {
      videoNode.volume = prevValue;
      return setVolume(videoNode.volume);
    }
  }, [prevValue, videoNode]);

  const adjustVolumeBasedOnKey = useCallback((direction: number) => {
    if (videoNode && direction === 0) {
      videoNode.volume -= 0.1;
      return setVolume(videoNode.volume);
    }

    if (videoNode && direction === 1) {
      videoNode.volume += 0.1;
      return setVolume(videoNode.volume);
    }

  }, [videoNode]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'm' || event.code === 'm') onMuteVolume();
      if (event.key === 'ArrowDown' || event.code === 'ArrowDown') adjustVolumeBasedOnKey(0);
      if (event.key === 'ArrowUp' || event.code === 'ArrowUp') adjustVolumeBasedOnKey(1);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [adjustVolumeBasedOnKey, onMuteVolume]);

  return {
    volume,
    onVolumeChange,
    onMuteVolume,
  };
}