import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const flexVariants = cva(
  'flex items-center justify-between',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface FlexProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof flexVariants> {
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, variant, ...props }, ref) => (
    <div className={cn(flexVariants({ variant, className }))}
         ref={ref}
         {...props}/>
  ));

Flex.displayName = 'Flex';

export { Flex };