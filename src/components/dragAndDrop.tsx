'use client';

import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {useLinkStore} from '@/store';
import {ChangeEvent} from 'react';

export const DragAndDrop = () => {
  const {changeLink} = useLinkStore();

  const onDragFile = (e: any) => {
    (e as DragEvent).preventDefault();
    (e as DragEvent).stopPropagation();
  };

  const onUploadFile = (e: any) => {
    (e as DragEvent).preventDefault();
    (e as DragEvent).stopPropagation();

    const files: FileList | null = (e as DragEvent).dataTransfer?.files ||
        (e as ChangeEvent<HTMLInputElement>).target?.files;

    if (files && files.length > 0)
      changeLink(Array.from(files).map(file => URL.createObjectURL(file)));

  };

  return (
      <div onDragEnter={onDragFile}
           onDragLeave={onDragFile}
           onDragOver={onDragFile}
           onDrop={onUploadFile}
           className={'w-screen h-screen'}>
        <div
            className="flex min-h-screen flex-col items-center justify-between p-24">
          <Label htmlFor={'video'}>
            <div className={'pb-2'}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                   color={'#ef9995'}
                   viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                   className="w-14 h-14">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
              </svg>
            </div>
            <p className="h-mb-2 text-xl text-primary"><span
                className="font-semibold">Click to upload</span> or drag and drop
            </p>
          </Label>
          <Input accept={'video/*, video/x-matroska'} onChange={onUploadFile} id={'video'} multiple={true}/>
        </div>
      </div>
  );
};

