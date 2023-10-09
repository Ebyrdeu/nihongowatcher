'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useSubtitleStore, useVideoStore } from '@/store';
import { DragFiles, uploadFiles } from '@/lib/utils';
import { UploadIcon } from '@/components/ui/icons';
import { Box } from '@/components/ui/box';
import { Paragraph } from '@/components/ui/paragraph';

export const DragAndDrop = () => {
  const { addEpisode } = useVideoStore();

  return (
    <Box
      onDragEnter={DragFiles}
      onDragLeave={DragFiles}
      onDragOver={DragFiles}
      onDrop={e => uploadFiles(e, addEpisode)}>
      <Label variant={'upload'} htmlFor="video">
        <UploadIcon clasName={'mb-2'} width={128} height={128} stroke={'1'}/>
        <Paragraph>
          <span className="font-semibold text-secondary">Choose a file</span> or drag it here.
        </Paragraph>
      </Label>
      <Input accept={'video/*, video/x-matroska'}
             onChange={e => uploadFiles(e, addEpisode)}
             id={'video'}
             multiple={true}/>
    </Box>
  );
};

