import React from "react";
import {Box, Paragraph} from "@/components/ui";
import {useSubtitleStore} from "@/store/use-subtitle-store";

const Subtitles = () => {
    const {subtitle, setMouse} = useSubtitleStore();

    return (
        <Box
            onMouseEnter={() => setMouse(true)}
            onMouseLeave={() => setMouse(false)}
            className={" absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}>
            <Paragraph
                style={{textShadow: "0 0 7px #000"}}
                className={"text-[#fff] font-bold text-center shadow-accent-content p-4 text-5xl antialiased  cursor-default"}>
                {subtitle}
            </Paragraph>
        </Box>
    );
};

export default Subtitles;

