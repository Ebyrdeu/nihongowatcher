import React from "react";
import {Box, Paragraph} from "@/components/ui";
import {useSubtitleStore} from "@/store/use-subtitle";

const Subtitles = () => {
    const {subtitle, setMouse} = useSubtitleStore();

    return subtitle === "" ? null : (
        <Box
            onMouseEnter={() => setMouse(true)}
            onMouseLeave={() => setMouse(false)}
            className={" absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}>
            <Paragraph
                className={"text-[#fff] bg-[#000]/60 p-4 text-4xl rounded-md antialiased font-normal cursor-default"}>
                {subtitle}
            </Paragraph>
        </Box>
    );
};

export default Subtitles;

