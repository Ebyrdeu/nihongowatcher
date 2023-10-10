'use client';

import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const sliderRootVariation = cva(
  'relative flex touch-none select-none items-center cursor-pointer',
  {
    variants: {
      variant: {
        volume: 'w-20',
        progress: 'w-full',
      },
    },
  },
);

const sliderTrackVariation = cva(
  'relative w-full grow overflow-hidden  bg-secondary/20',
  {
    variants: {
      track: {
        volume: 'duration-150 ease-in-out h-1 hover:h-2 rounded-full',
        progress: 'duration-150 ease-in-out h-1 hover:h-3 delay-100 ',
      },
    },
  },
);

type SliderElement = React.ElementRef<typeof SliderPrimitive.Root>

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  VariantProps<typeof sliderRootVariation>,
  VariantProps<typeof sliderTrackVariation> {
}

const Slider = React.forwardRef<SliderElement, SliderProps>(({ className, variant, track, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(sliderRootVariation({ variant, className }))}
    {...props}>
    <SliderPrimitive.Track className={cn(sliderTrackVariation({ track }))}>
      <SliderPrimitive.Range className="absolute  h-full bg-secondary"/>
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block opacity-0 rounded-full border border-secondary/50 bg-secondary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"/>
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };