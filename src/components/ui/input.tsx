import React from 'react';
import {cn} from '@/lib/utils';

/**
 * Props for the VideoInput component, extending React's input attributes.
 * @interface VideoInputProps
 * @extends React.InputHTMLAttributes<HTMLInputElement>
 */
export interface VideoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

/**
 * Input component for handling file input, specifically for video files.
 * @component
 * @param {VideoInputProps} props - The props for the VideoInput component.
 * @param {string} props.className - Additional CSS classes for customization.
 * @param {string} props.type - The type of input (defaults to 'file').
 * @param {string} props.accept - File types accepted by the input (video/* by default).
 * @param {React.Ref<HTMLInputElement>} ref - The React ref for the input element.
 * @returns {JSX.Element} The rendered Input component.
 */
const Input = React.forwardRef<HTMLInputElement, VideoInputProps>(
    ({className, type, accept, ...props}, ref) => {
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

export {Input};
