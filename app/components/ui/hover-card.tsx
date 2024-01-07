import React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import {cn} from "@/lib";

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;
const HoverCardArrow = HoverCardPrimitive.Arrow;


type HoverCardContentElement = React.ElementRef<typeof HoverCardPrimitive.Content>;

interface HoverCardContentProps extends React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> {

}


const HoverCardContent = React.forwardRef<HoverCardContentElement, HoverCardContentProps>
(({className, align = "center", sideOffset = 4, ...props}, ref) => (
    <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
            "w-[600px] backdrop-blur-md bg-black/35 p-5 rounded-md data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade  data-[state=open]:transition-all",
            className,
        )}
        {...props}
    />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export {HoverCard, HoverCardTrigger, HoverCardContent, HoverCardArrow};