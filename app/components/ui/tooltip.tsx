import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import {cn} from "@/lib";

type TooltipElement = React.ElementRef<typeof TooltipPrimitive.Content>;

interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
    children: React.ReactNode;
    sideOffset?: number;
    value: number | string;
}

const Tooltip = React.forwardRef<TooltipElement, TooltipProps>(
    ({children, value, sideOffset = 4, className, ...props}, ref) => {
        return (
            <TooltipPrimitive.Provider delayDuration={0}>
                <TooltipPrimitive.Root>
                    <TooltipPrimitive.Trigger asChild
                                              onMouseDown={e => e.preventDefault()}
                                              onClick={e => e.preventDefault()}
                    >
                        {children}
                    </TooltipPrimitive.Trigger>
                    <TooltipPrimitive.Portal>
                        <TooltipPrimitive.Content
                            onPointerDownOutside={(event) => event.preventDefault()}
                            ref={ref}
                            className={cn(
                                "z-auto overflow-hidden rounded-md bg-primary-content px-3 py-1.5 text-xs text-neutral-content animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                                className,
                            )}
                            hideWhenDetached={false}
                            sideOffset={sideOffset}
                            {...props}
                        >
                            {value}
                            <TooltipPrimitive.Arrow className="fill-primary-content"/>
                        </TooltipPrimitive.Content>
                    </TooltipPrimitive.Portal>
                </TooltipPrimitive.Root>
            </TooltipPrimitive.Provider>
        );
    });

Tooltip.displayName = TooltipPrimitive.Content.displayName;

export {Tooltip};