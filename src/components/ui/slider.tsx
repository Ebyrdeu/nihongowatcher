import React from 'react';
import {cva, VariantProps} from 'class-variance-authority';
import {cn} from '@/lib/utils';

const sliderVariants = cva('rounded-md h-1 appearance-none cursor-pointer transition duration-150 ease-in-out',
    {
      variants: {
        variant: {
          default: 'bg-neutral-content/25 accent-neutral-content',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    });

interface SliderProps extends React.HTMLAttributes<HTMLInputElement>, VariantProps<typeof sliderVariants> {
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    ({className, variant, ...props}, ref) => {
     return  (
          <input step={1}
                 min={0}
                 max={100}
                 type="range"
                 className={cn(sliderVariants({variant, className}))} ref={ref}
                 {...props}/>
      )
    });

Slider.displayName = 'Slider';

export {Slider};