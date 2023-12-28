import React, {useState} from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import {cn} from "@/lib";
import {cva, VariantProps} from "class-variance-authority";

const sliderRootVariation = cva(
    "relative flex touch-none select-none items-center cursor-pointer",
    {
        variants: {
            variant: {
                volume: "w-20",
                progress: "w-full h-6",
            },
        },
    },
);

const sliderTrackVariation = cva(
    "relative w-full grow overflow-hidden  bg-primary-content/50",
    {
        variants: {
            track: {
                volume: "duration-200 ease-in-out delay-500 hover:delay-0 rounded-full",
                progress: "duration-200 ease-in-out",
            },
        },
    },
);

type SliderElement = React.ElementRef<typeof SliderPrimitive.Root>

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderRootVariation>,
    VariantProps<typeof sliderTrackVariation> {
}

const Slider = React.forwardRef<SliderElement, SliderProps>(({className, variant, track, ...props}, ref) => {

    const [hovered, setHovered] = useState(false);
    return (
        <SliderPrimitive.Root
            ref={ref}
            className={cn(sliderRootVariation({variant, className}))}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            {...props}>
            <SliderPrimitive.Track className={`${cn(sliderTrackVariation({track}))} ${!hovered ? "h-1.5" : "h-3"}`}>
                <SliderPrimitive.Range className="absolute h-full bg-error"/>
            </SliderPrimitive.Track>
            <SliderPrimitive.Thumb
                className=" transform transition duration-500 hover:scale-125 block h-4 w-4 rounded-full border-2 border-error bg-error ring-offset-error  focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"/>
        </SliderPrimitive.Root>
    );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export {Slider};