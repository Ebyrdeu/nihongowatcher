'use client';

import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const boxVariants = cva(
  'bg-transparent',
  {
    variants: {
      variant: {
        rounded: 'rounded-md',
        center: 'w-1/2 m-auto mt-24 relative',
      },
      specialLayout: {
        overlay: 'absolute top-0 left-0 right-0 transition duration-150 ease-in-out',
      },
    },
  });

type BoxElement = React.ElementRef<'div'>;

interface BoxProps extends React.ComponentPropsWithoutRef<'div'>, VariantProps<typeof boxVariants> {
  asChild?: boolean;
}

const Box = React.forwardRef<BoxElement, BoxProps>(
  ({ className, variant, asChild, specialLayout, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return <Comp
      className={cn(boxVariants({ variant, specialLayout, className }))}
      ref={ref}
      {...props}
    />;
  },
);

Box.displayName = 'Box';

export { Box };
