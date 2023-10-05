import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the VideoInput component, extending React's input attributes.
 * @interface VideoInputProps
 * @extends React.InputHTMLAttributes<HTMLInputElement>
 */
export interface VideoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input = React.forwardRef<HTMLInputElement, VideoInputProps>(
  ({ className, type, accept, ...props }, ref) => {
    return (
      <input
        className={cn('hidden', className)}
        type={!type ? 'file' : type}
        accept={accept}
        ref={ref}
        {...props}
      />
    );
  },
);

// Display name for the Input component
Input.displayName = 'Input';

export { Input };
