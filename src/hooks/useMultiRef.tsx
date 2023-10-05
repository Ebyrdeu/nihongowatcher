import { useRef } from 'react';

export function useMultiRef () {
  const videoRef = useRef<HTMLVideoElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef<HTMLInputElement>(null);

  return {
    videoRef,
    divRef,
    slideRef,
  };
}