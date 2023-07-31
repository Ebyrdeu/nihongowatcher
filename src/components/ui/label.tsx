import React from 'react';
import {cn} from '@/lib/utils';
import {cva, type VariantProps} from 'class-variance-authority';

const labelVariants = cva(
    'flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer',
    {
      variants: {
        variant: {
          default: 'bg-base-100 dark:border-base-200 dark:hover:border-base-300',
          dark: 'bg-base-200 dark:border-base-100 dark:hover:border-base-300',
          darker: 'bg-base-300 dark:border-base-200 dark:hover:border-base-100',
        },
      },

      defaultVariants: {
        variant: 'default',
      },
    });

export interface LabelProps extends React.HTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {
  htmlFor: string;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
    ({className, variant, htmlFor, ...props}, ref) => {
      return (
          <label
              htmlFor={htmlFor}
              className={cn(labelVariants({variant, className}))}
              ref={ref}
              {...props}
          />
      );
    });

Label.displayName = 'Label';

export {
  Label,
};