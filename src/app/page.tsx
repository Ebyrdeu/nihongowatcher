'use client';

import { DragAndDrop } from '@/components/dragAndDrop';
import { useSubtitleStore, useVideoStore } from '@/store';
import VideoPlayer from '@/components/videoPlayer';

export default function Home () {
  const { videoLink } = useVideoStore();

  return (
    <main>
      {videoLink.length <= 0 ? <DragAndDrop/> : <VideoPlayer/>}
    </main>
  );
}
