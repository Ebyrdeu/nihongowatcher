import React, {useRef, useState} from 'react';
import {Video} from '@/components/ui/video';
import {useLinkStore} from '@/store';
import {Input} from '@/components/ui/input';

/**
 * VideoPlayer component displays a video with optional overlay
 * that becomes visible when the mouse hovers over the video.
 */
const VideoPlayer = () => {
      const {link} = useLinkStore();
      const [changeLink, setChangeLink] = useState<string | undefined>(undefined);
      const ref = useRef<HTMLVideoElement>(null);

      const onUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const file = e.target?.files?.[0];

        if (file) setChangeLink(URL.createObjectURL(file));
      };

      return (
          <div className={'relative w-1/2 m-auto mt-24'}>
            <Input accept={'.vtt, .srt'}
                   onChange={onUploadFile}
                   id={'sub'}/>

            <Video controls={true} ref={ref} src={link}
                   subtitles={changeLink}/>
          </div>
      );
    }
;

export default VideoPlayer;
