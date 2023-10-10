'use client';

import { DragAndDrop } from '@/components/dragAndDrop';
import { VideoPlayer } from '@/components/videoPlayer';
import { useVideoStore } from '@/store';

export default function Home () {
  const { videoLink } = useVideoStore();

  return (
    <main>
      {videoLink.length <= 0 ? <DragAndDrop/> : <VideoPlayer/>}
    </main>
  );
}
