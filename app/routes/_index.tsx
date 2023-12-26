import type {MetaFunction} from "@remix-run/node";
import {useVideoStore} from "@/store";
import {DragAndDrop} from "@/components/drag-and-drop";
import {VideoPlayer} from "@/components/video-player";

export const meta: MetaFunction = () => {
    return [
        {title: "日本語 Watcher"},
        {name: "A Video Player to watch Japanese Videos with your favorite pocket dictionary"},
    ];
};

export default function Index() {
    const {videoLink} = useVideoStore();
    return (
        <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.8"}}>
            {videoLink.length <= 0 ? <DragAndDrop/> : <VideoPlayer/>}
        </div>
    );
}
