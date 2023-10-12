'use client';

import { useRefStore } from '@/store';
import { formatTime } from '@/lib/utils';

export function useFormatVideoTime () {
  const { videoNode } = useRefStore();

  if (!videoNode) return null;

  const currentTime = formatTime(videoNode.currentTime);
  const totalTime = formatTime(videoNode.duration);

  return `${currentTime} / ${totalTime}`;
}


