'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-base-100 hover:bg-base-200',
        outline: 'bg-transparent border-2 border-rose-600 focus:outline-none',
        transparent: 'bg-transparent focus:outline-none',
      },
      size: {
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'transparent',
      size: 'icon',
    },
  });

type ButtonElement = React.ElementRef<'button'>;

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftSection?: React.ReactNode;
}

const Button = React.forwardRef<ButtonElement, ButtonProps>(
  ({ className, size, variant, asChild, leftSection, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp
      tabIndex={-1}
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}>
      {leftSection && leftSection}
      {children}
    </Comp>;
  },
);

Button.displayName = 'Button';

export { Button };
