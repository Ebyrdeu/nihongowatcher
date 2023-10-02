import React from 'react';
import {cn} from '@/lib/utils';
import {cva, type VariantProps} from 'class-variance-authority';

/**
 * Define label variants and their corresponding CSS classes.
 * @type {Function}
 */
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
    },
);

/**
 * Props for the Label component, extending React's label attributes
 * and including variant props from `labelVariants`.
 * @interface LabelProps
 * @extends React.HTMLAttributes<HTMLLabelElement>
 * @extends VariantProps<typeof labelVariants>
 */
export interface LabelProps extends React.HTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {
  htmlFor: string;
}

/**
 * Label component for creating interactive labels.
 * @component
 * @param {LabelProps} props - The props for the Label component.
 * @param {string} props.className - Additional CSS classes for customization.
 * @param {string} props.variant - The variant of the label.
 * @param {string} props.htmlFor - The associated form element's id.
 * @param {React.Ref<HTMLLabelElement>} ref - The React ref for the label element.
 * @returns {JSX.Element} The rendered Label component.
 */
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
    },
);

// Display name for the Label component
Label.displayName = 'Label';

export {Label};
