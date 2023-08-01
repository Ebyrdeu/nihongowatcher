import React from 'react';
import {cn} from '@/lib/utils';

export interface VideoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}

const Input = React.forwardRef<HTMLInputElement, VideoInputProps>(
    ({className, type, accept, ...props}, ref) => {
      return (
          <input
              className={cn('hidden', className)}
              type={!type ? 'file' : type}
              accept={'video/*, .srt, .vtt'}
              ref={ref}
              {...props}
          />
      );
    });

Input.displayName = 'Input';

export {
  Input,
};