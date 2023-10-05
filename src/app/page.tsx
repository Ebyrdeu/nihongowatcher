'use client';

import { DragAndDrop } from '@/components/dragAndDrop';
import { useLinkStore } from '@/store';
import VideoPlayer from '@/components/videoPlayer';

export default function Home () {
  const { link } = useLinkStore();

  return (
    <main>
      {link.length <= 0 ? <DragAndDrop/> : <VideoPlayer/>}
    </main>
  );
}
