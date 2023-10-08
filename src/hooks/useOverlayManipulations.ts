/*
import { useCallback, useEffect, useRef } from 'react';
import { useOverLayStore, useRefStore } from '@/store';

export function useOverlayManipulations () {
  const { isFullscreen, setPaused, setFullscreen, setMute, setVolumeScale } = useOverLayStore();
  const {videoNode, fullscreenRef, volumeRef} = useRefStore()

  const togglePlayPause = useCallback(() => {
    if (videoNode.current) {
      videoNode.current.paused ? videoNode.current.play() : videoNode.current.pause();
      setPaused(videoNode.current.paused);
    }
  }, [setPaused, videoNode]);

  const toggleFullscreenMode = useCallback(() => {
    if (fullscreenRef.current) {
      if (document.fullscreenElement === null) void fullscreenRef.current.requestFullscreen();
      else void document.exitFullscreen();
      setFullscreen(!isFullscreen);
    }
  }, [isFullscreen, setFullscreen, fullscreenRef]);

  const toggleMuteVolume = useCallback(() => {
    if (videoNode.current && volumeRef.current) {
      const newVolume = videoNode.current.volume === 0 ? setVolumeScale(volumeRef.current.value) : 0;
      videoNode.current.volume = newVolume;
      setMute(newVolume === 0);
    }
  }, [setMute, setVolumeScale, videoNode, volumeRef]);

  const handleVolumeChange = useCallback(() => {
    if (videoNode.current && volumeRef.current) videoNode.current.volume = setVolumeScale(volumeRef.current.value);
  }, [setVolumeScale, videoNode, volumeRef]);

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ' || event.code === 'Space') togglePlayPause();
      if (event.key === 'f' || event.code === 'KeyF') toggleFullscreenMode();
      if (event.key === 'm' || event.code === 'KeyM') toggleMuteVolume();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [togglePlayPause, toggleFullscreenMode, toggleMuteVolume]);

  return {
    togglePlayPause,
    toggleFullscreenMode,
    toggleMuteVolume,
    handleVolumeChange,

  };
}

*/
