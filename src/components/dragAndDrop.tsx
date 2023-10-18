'use client';

import { Box, Input, Label, Paragraph } from '@/components/ui';
import { useVideoStore } from '@/store';
import { DragFiles, uploadVideoFiles } from '@/lib/utils';
import { UploadIcon } from '@/components/ui/icons';

export const DragAndDrop = () => {
  const { addEpisode } = useVideoStore();

  return (
    <Box
      onDragEnter={DragFiles}
      onDragLeave={DragFiles}
      onDragOver={DragFiles}
      onDrop={e => uploadVideoFiles(e, addEpisode)}>
      <Label variant={'upload'} htmlFor="video">
        <UploadIcon/>
        <Paragraph>
          <span className="font-semibold text-secondary">Choose a file</span> or drag it here.
        </Paragraph>
      </Label>
      <Input accept={'video/*, video/x-matroska'}
             onChange={e => uploadVideoFiles(e, addEpisode)}
             id={'video'}
             multiple={true}/>
    </Box>
  );
};

