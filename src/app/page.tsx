"use client";

import {DragAndDrop} from "@/components/drag-and-drop";
import {VideoPlayer} from "@/components/video-player";
import {useVideoStore} from "@/store";

export default function Home() {
    const {videoLink} = useVideoStore();

    return (
        <main>
            {videoLink.length <= 0 ? <DragAndDrop/> : <VideoPlayer/>}
        </main>
    );
}
