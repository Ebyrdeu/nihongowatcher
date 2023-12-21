"use client";

import React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cn} from "@/lib";

type ParagraphElement = React.ElementRef<"p">;

interface ParagraphProps extends React.ComponentPropsWithoutRef<"p"> {
    asChild?: boolean;
}

const Paragraph = React.forwardRef<ParagraphElement, ParagraphProps>(
    ({className, asChild, ...props}, ref) => {
        const Comp = asChild ? Slot : "p";
        return <Comp
            className={cn("text-neutral-content", className)}
            ref={ref}
            {...props}
        />;
    },
);

Paragraph.displayName = "Paragraph";

export {Paragraph};
