import React from "react";
import {Box, Paragraph} from "@/components/ui";
import {useSubtitleStore} from "@/store/use-subtitle-store";

const Subtitles = () => {
    const {subtitle, setMouse} = useSubtitleStore();

    return (
        <Box
            onMouseEnter={() => setMouse(true)}
            onMouseLeave={() => setMouse(false)}
            className={" absolute bottom-[5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-100"}>
            <Paragraph
                style={{textShadow: "0 0 7px #000", fontWeight: "bolder"}}
                className={"text-[#fff] text-center shadow-accent-content p-4 md:text-[34px] lg:text-[40px]  xl:text-[48px] antialiased  cursor-default"}>
                {subtitle}
            </Paragraph>
        </Box>
    );
};

export default Subtitles;

