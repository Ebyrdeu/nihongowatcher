import {type ChangeEvent, DragEvent} from "react";

interface VideoDataProps {
    name: string,
    link: string
}

class VideoParser {

    public static upload(e: unknown, cb: (link: VideoDataProps[]) => void): void {
        (e as DragEvent).preventDefault();
        (e as DragEvent).stopPropagation();

        const files: FileList | null = (e as DragEvent).dataTransfer?.files ||
            (e as ChangeEvent<HTMLInputElement>).target?.files;

        if (files && files.length > 0) {
            const links = Array.from(files).map(file => {
                return ({
                    name: this.clearFileName(file.name),
                    link: URL.createObjectURL(file),
                });
            });

            const sorted = this.sort(links);
            const uniqueLinks = this.toUniqueFiles(sorted);

            cb(uniqueLinks);
        }
    }

    private static sort(files: VideoDataProps[]): VideoDataProps[] {
        //TODO: Improve sort based on numbers value and string values
        return files.sort((a, b) => a.name.localeCompare(b.name));
    }

    private static toUniqueFiles(files: VideoDataProps[]): VideoDataProps[] {
        return files.filter((value, index, self) =>
            index === self.findIndex((t) => t.name === value.name));
    }

    private static clearFileName(fileName: string): string {
        return fileName
            // delete any file extensions and anything with and including () or []
            .replace(/\[[^\]]*]|\.\w+$|\([^)]*\)/g, "")
            // delete anything after including  `WEB-` `BD` `UHD` type format or starting from resolution
            .replace(/BD[^|]*$|WEB-[^|]*$|UHD[^|]*$|\d{3,4}p[^|]*$/g, "")
            // delete  any dots in naming and replace with empty space
            .replace(/\.+/g, " ");
    }
}

export {VideoParser, type VideoDataProps};