import React from "react";
import {Box, Paragraph} from "@/components/ui";

const Subtitles = () => {
    const subtitles = [{
        start: "00:01:59,770",
        end: "00:02:01,730",
        text: "（ヒンメル）　フリーレン。",
    }, {
        start: "00:02:08,710",
        end: " 00:02:10,710",
        text: "（フリーレン）　王都が見えてきたね。",
    }];


    return (
        <Box asChild
             className={" absolute bottom-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}>
            <Paragraph
                className={"text-center text-[#fff] bg-[#000]/60 p-4 text-4xl rounded-md antialiased font-normal cursor-default"}>
                （フリーレン） 王都が見えてきたね。
            </Paragraph>
        </Box>
    );
};

export default Subtitles;

