import {useVideoStore} from "@/store";
import {Button, Flex, HoverCard, HoverCardContent, HoverCardTrigger, Paragraph, ScrollArea} from "@/components/ui";
import {EpisodeListIcon} from "@/components/ui/icons";
import {instanceOf} from "@/lib";

export const VideoList = () => {
    const {videoLink, setVideoNumber} = useVideoStore();

    return (
        <HoverCard openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
                <Button ref={instanceOf} variant={"transparent"} leftSection={<EpisodeListIcon/>}/>
            </HoverCardTrigger>
            <HoverCardContent sideOffset={-5} className={"controls"}>
                <ScrollArea className={"h-[400px] controls"}>
                    {videoLink.map(({link, name}, i) => (
                        <Flex key={link}
                              className={" text-white p-5 rounded-xl  cursor-pointer hover:backdrop-blur-md hover:bg-primary-content/30 "}>
                            <Paragraph onClick={() => setVideoNumber(i)}
                                       className={"controls  text-2xl text-white"}>{name}</Paragraph>
                        </Flex>
                    ))}
                </ScrollArea>
            </HoverCardContent>
        </HoverCard>
    );
};

