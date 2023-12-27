import {Box, Input, Label, Paragraph} from "@/components/ui";
import {useVideoStore} from "@/store";
import {DragFiles, uploadVideoFiles} from "@/lib";
import {UploadIcon} from "@/components/ui/icons";

export const DragAndDrop = () => {
    const {addVideo} = useVideoStore();

    return (
        <Box
            onDragEnter={DragFiles}
            onDragLeave={DragFiles}
            onDragOver={DragFiles}
            onDrop={e => uploadVideoFiles(e, addVideo)}>
            <Label variant={"upload"} htmlFor="video">
                <UploadIcon/>
                <Paragraph>
                    <span className="font-semibold text-secondary">Choose a file</span> or drag it here.
                </Paragraph>
            </Label>
            <Input accept={"video/*, video/x-matroska"}
                   onChange={e => uploadVideoFiles(e, addVideo)}
                   id={"video"}
                   multiple={true}/>
        </Box>
    );
};

