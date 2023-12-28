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
            direction: {
                row: "flex-row",
                rowReverse: "flex-row-reverse",
                col: "flex-col",
                colReverse: "flex-col-reverse",
            },
            gap: {
                none: "gap-0",
                xs: "gap-1",
                sm: "gap-2",
                md: "gap-4",
                lg: "gap-8",
                xl: "gap-10",
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
    ({className, align, gap, justify, direction, asChild, ...props}, ref) => {
        const Comp = asChild ? Slot : "div";
        return <Comp
            className={cn(flexVariants({align, gap, justify, direction, className}))}
            ref={ref}
            {...props}
        />;
    },
);

Flex.displayName = "Flex";

export {Flex};