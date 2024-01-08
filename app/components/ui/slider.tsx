import React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import {cn, mousePosition} from "@/lib";
import {cva, type VariantProps} from "class-variance-authority";
import {VideoPreview} from "@/components/video-preview";
import {useSliderStore} from "@/store";

const sliderRootVariation = cva(
    "relative flex touch-none select-none items-center justify-items-center  cursor-pointer",
    {
        variants: {
            variant: {
                volume: "h-20 w-1.5",
                progress: "w-full h-6 controls",
            },
        },
    },
);

const sliderTrackVariation = cva(
    "controls relative w-full grow overflow-hidden  bg-black/50",
    {
        variants: {
            track: {
                progress: "duration-200 ease-in-out controls",
            },
        },
    },
);

type SliderElement = React.ElementRef<typeof SliderPrimitive.Root>

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderRootVariation>,
    VariantProps<typeof sliderTrackVariation> {
    isVertical?: boolean;
}

const Slider = React.forwardRef<SliderElement, SliderProps>(
    ({className, variant, track, isVertical = false, ...props}, ref) => {

        const {setHover, setPositioning, isHover} = useSliderStore();

        return (
            <SliderPrimitive.Root
                ref={ref}
                className={`${cn(sliderRootVariation({variant, className}))} ${isVertical ? "flex-col" : ""}`}
                onMouseEnter={() => !isVertical && setHover(true)}
                onMouseLeave={() => !isVertical && setHover(false)}
                onMouseMove={e => setPositioning(mousePosition(e))}
                {...props}>
                <SliderPrimitive.Track
                    className={`${cn(sliderTrackVariation({track}))} ${!isHover ? "h-1.5" : "h-3"}`}>
                    <SliderPrimitive.Range
                        className={`absolute ${isVertical ? "w-full" : " h-full"} bg-error controls`}/>
                    {!isVertical && <VideoPreview/>}
                </SliderPrimitive.Track>
                <SliderPrimitive.Thumb
                    className={`transform transition duration-150  h-4 w-4 hover:scale-125 block rounded-full border-2 border-error bg-error ring-offset-error  focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring controls focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}/>
            </SliderPrimitive.Root>
        );
    });

Slider.displayName = SliderPrimitive.Root.displayName;

export {Slider};