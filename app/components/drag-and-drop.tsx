import {Box, Input, Label, Paragraph} from "@/components/ui";
import {useVideoStore} from "@/store";
import {VideoParser} from "@/lib";
import {UploadIcon} from "@/components/ui/icons";
import {DragEvent} from "react";

export const DragAndDrop = () => {
    const {addVideo} = useVideoStore();

    const onDrag = (e: unknown) => {
        (e as DragEvent).preventDefault();
        (e as DragEvent).stopPropagation();
    };

    return (
        <Box
            onDragEnter={onDrag}
            onDragLeave={onDrag}
            onDragOver={onDrag}
            onDrop={onDrag}>
            <Label variant={"upload"} htmlFor="video">
                <UploadIcon/>
                <Paragraph>
                    <span className="font-semibold text-error">Choose a file</span> or drag it here.
                </Paragraph>
            </Label>
            <Input accept={"video/*, video/x-matroska"}
                   onChange={e => VideoParser.upload(e, addVideo)}
                   id={"video"}
                   multiple={true}/>
        </Box>
    );
};

