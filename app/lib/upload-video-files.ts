import {type ChangeEvent} from "react";
import {type VideoDataProps} from "@/store";

export const uploadVideoFiles = (e: unknown, cb: (link: VideoDataProps[]) => void) => {
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

};

export const DragFiles = (e: unknown) => {
    (e as DragEvent).preventDefault();
    (e as DragEvent).stopPropagation();
};