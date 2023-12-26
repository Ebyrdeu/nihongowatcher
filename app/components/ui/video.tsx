import React from "react";
import {cn} from "@/lib";
import {Slot} from "@radix-ui/react-slot";

type VideoElement = React.ElementRef<"video">;

interface VideoProps extends React.ComponentPropsWithoutRef<"video"> {
    asChild?: boolean;
}

const Video = React.forwardRef<VideoElement, VideoProps>(
    ({className, controls = false, asChild, ...props}, ref) => {
        const Comp = asChild ? Slot : "video";
        return <Comp
            preload={"auto"}
            autoPlay={true}
            controls={controls}
            className={cn("h-screen m-auto", className)}
            ref={ref}
            {...props}
        >
            Your browser does not support the video tag.
        </Comp>;
    },
);

Video.displayName = "Video";

export {Video};
