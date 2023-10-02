import React from 'react';
import {cn} from '@/lib/utils';
import {cva, VariantProps} from 'class-variance-authority';

/**
 * Define button variants and their corresponding CSS classes.
 * @type {Function}
 */
const buttonVariants = cva('font-bold py-2 px-4 rounded', {
  variants: {
    variant: {
      default: 'bg-base-100 hover:bg-base-200',
      subtle: 'bg-transparent',
    },
    text: {
      default: 'text-primary-content',
      pink: 'text-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
    text: 'default',
  },
});

/**
 * Props for the Button component, extending React's button attributes
 * and including variant props from `buttonVariants`.
 * @interface ButtonProps
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 * @extends VariantProps<typeof buttonVariants>
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
}

/**
 * Button component for creating interactive buttons.
 * @component
 * @param {ButtonProps} props - The props for the Button component.
 * @param {string} props.className - Additional CSS classes for customization.
 * @param {string} props.variant - The variant of the button.
 * @param {React.Ref<HTMLButtonElement>} ref - The React ref for the button element.
 * @returns {JSX.Element} The rendered Button component.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, ...props}, ref) => {
      return <button className={cn(buttonVariants({variant, className}))}
                     ref={ref} {...props} />;
    },
);

// Display name for the Button component
Button.displayName = 'Button';

export {Button};