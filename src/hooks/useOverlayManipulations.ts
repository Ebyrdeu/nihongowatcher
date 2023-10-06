import { useCallback, useEffect, useRef } from 'react';
import { useOverLayStore } from '@/store';

export function useOverlayManipulations () {
  const { isFullscreen, setPaused, setFullscreen, setMute, setVolumeScale } = useOverLayStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
      setPaused(videoRef.current.paused);
    }
  }, [setPaused, videoRef]);

  const toggleFullscreenMode = useCallback(() => {
    if (divRef.current) {
      if (document.fullscreenElement === null) void divRef.current.requestFullscreen();
      else void document.exitFullscreen();
      setFullscreen(!isFullscreen);
    }
  }, [isFullscreen, setFullscreen, divRef]);

  const toggleMuteVolume = useCallback(() => {
    if (videoRef.current && sliderRef.current) {
      const newVolume = videoRef.current.volume === 0 ? setVolumeScale(sliderRef.current.value) : 0;
      videoRef.current.volume = newVolume;
      setMute(newVolume === 0);
    }
  }, [setMute, setVolumeScale, videoRef, sliderRef]);

  const handleVolumeChange = useCallback(() => {
    if (videoRef.current && sliderRef.current) videoRef.current.volume = setVolumeScale(sliderRef.current.value);
  }, [setVolumeScale, videoRef, sliderRef]);

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
    videoRef,
    divRef,
    sliderRef,

    togglePlayPause,
    toggleFullscreenMode,
    toggleMuteVolume,
    handleVolumeChange,

  };
}

