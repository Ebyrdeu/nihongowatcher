'use client';

import { useRefStore } from '@/store';
import { convertToTwoDigits } from '@/lib/utils';

export function useFormatVideoTime () {
  const { videoNode } = useRefStore();

  if (!videoNode) return null;

  const totalMinutes = convertToTwoDigits(videoNode?.duration / 60);
  const totalSeconds = convertToTwoDigits(videoNode.duration % 60);

  const currentMinutes = convertToTwoDigits(videoNode.currentTime / 60);
  const currentSeconds = convertToTwoDigits(videoNode.currentTime % 60);

  return `${currentMinutes}:${currentSeconds} / ${totalMinutes}:${totalSeconds}`;
}
