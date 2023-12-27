import {useVideoStore} from "@/store";
import {Box, Paragraph} from "@/components/ui";
import {useListStore} from "@/store/use-list-store";

export const VideoList = () => {
    const {videoLink, setEpisode} = useVideoStore();
    const {isOpen} = useListStore();

    return (
        <Box
            className={` 
            ${isOpen ? "opacity-100" : "opacity-0 w-0"} 
            overflow-hidden
            duration-300 ease-in-out rounded-bl-lg bg-accent-content/50 absolute right-0 top-0 `}>
            {videoLink.map(({link, name}, k) => (
                <Paragraph onClick={() => setEpisode(k)}
                           className={" rounded-bl-lg cursor-pointer p-4 hover:bg-accent-content/45"}
                           key={link}>{name}</Paragraph>
            ))}
        </Box>
    );
};

