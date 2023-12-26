import React from "react";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib";
import {Slot} from "@radix-ui/react-slot";

const flexVariants = cva(
    "flex",
    {
        variants: {
            type: {
                inline: "flex-inline",
            },
            justify: {
                start: " justify-start",
                center: "justify-center",
                between: "justify-between",
            },
            align: {
                start: " items-start",
                center: "items-center",
                between: "items-between",
            },
            gap: {
                none: "gap-0",
                xs: "gap-1",
                sm: "gap-2",
                md: "gap-4",
                lg: "gap-8",
                xl: "gap-10",
            },
            specialLayout: {
                overlay: "absolute bottom-0 left-0 right-0 bg-primary-content/25 transition duration-150 ease-in-out",
            },
        },
        defaultVariants: {
            justify: "start",
            align: "center",
            gap: "md",
        },
    },
);

type FlexElement = React.ElementRef<"div">;

interface FlexProps extends React.ComponentPropsWithoutRef<"div">, VariantProps<typeof flexVariants> {
    asChild?: boolean;
}

const Flex = React.forwardRef<FlexElement, FlexProps>(
    ({className, align, gap, justify, specialLayout, asChild, ...props}, ref) => {
        const Comp = asChild ? Slot : "div";
        return <Comp
            className={cn(flexVariants({align, gap, justify, specialLayout, className}))}
            ref={ref}
            {...props}
        />;
    },
);

Flex.displayName = "Flex";

export {Flex};