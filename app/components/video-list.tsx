import {useVideoStore} from "@/store";
import {Box, Paragraph, ScrollArea} from "@/components/ui";
import {useListStore} from "@/store/use-list-store";

export const VideoList = () => {
    const {videoLink, setVideoNumber} = useVideoStore();
    const {isOpen} = useListStore();

    return (
        <Box
            className={` duration-300 ease-in-out rounded-bl-lg   ${isOpen ? "opacity-100" : "opacity-0 w-0"}   overflow-hidden  bg-accent-content/50 absolute right-0 top-0`}>
            <ScrollArea className="w-[500px] ">
                {videoLink.map(({link, name}, i) => (
                    <Box key={link}>
                        <Paragraph onClick={() => setVideoNumber(i)}
                                   className={" rounded-bl-lg cursor-pointer p-4 hover:bg-accent-content/45"}>{name}</Paragraph>
                    </Box>
                ))}
            </ScrollArea>
        </Box>
    );
};

