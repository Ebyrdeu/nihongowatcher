import { type ChangeEvent } from 'react';
import { SubtitleDataProps, type VideoDataProps } from '@/store';

export function uploadFiles (e: unknown, cb: (link: VideoDataProps[] | SubtitleDataProps[]) => void) {
  (e as DragEvent).preventDefault();
  (e as DragEvent).stopPropagation();

  const files: FileList | null = (e as DragEvent).dataTransfer?.files ||
    (e as ChangeEvent<HTMLInputElement>).target?.files;

  if (files && files.length > 0) {
    const links = Array.from(files).map(file => ({
      name: file.name,
      link: URL.createObjectURL(file),
    }));
    cb(links);
  }

}

export function DragFiles (e: unknown) {
  (e as DragEvent).preventDefault();
  (e as DragEvent).stopPropagation();
}