import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import {cn} from "@/lib";

type ScrollAreaElement = React.ElementRef<typeof ScrollAreaPrimitive.Root>;
type ScrollBarElement = React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>;

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {

}

interface ScrollBarProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> {

}

const ScrollArea = React.forwardRef<ScrollAreaElement, ScrollAreaProps>
(({className, children, ...props}, ref) => (
    <ScrollAreaPrimitive.Root
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}

    >
        <ScrollBar/>
        <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
            {children}
        </ScrollAreaPrimitive.Viewport>

        <ScrollAreaPrimitive.Corner/>
    </ScrollAreaPrimitive.Root>
));

const ScrollBar = React.forwardRef<ScrollBarElement, ScrollBarProps>
(({className, orientation = "vertical", ...props}, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
        ref={ref}
        orientation={orientation}
        className={cn(
            "flex touch-none select-none transition-colors",
            orientation === "vertical" &&
            "h-full w-2.5 border-l border-l-transparent p-[1px]",
            orientation === "horizontal" &&
            "h-2.5 flex-col border-t border-t-transparent p-[1px]",
            className,
        )}
        {...props}
    >
        <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border"/>
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
));


ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export {ScrollArea, ScrollBar};