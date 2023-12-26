import React from "react";
import {cn} from "@/lib";
import {Slot} from "@radix-ui/react-slot";

type InputElement = React.ElementRef<"input">

interface VideoInputProps extends React.ComponentPropsWithoutRef<"input"> {
    asChild?: boolean;
}

const Input = React.forwardRef<InputElement, VideoInputProps>(
    ({className, type, accept, asChild, ...props}, ref) => {
        const Comp = asChild ? Slot : "input";
        return (
            <Comp
                className={cn("hidden", className)}
                type={!type ? "file" : type}
                accept={accept}
                ref={ref}
                {...props}
            />
        );
    },
);

// Display name for the Input component
Input.displayName = "Input";

export {Input};
