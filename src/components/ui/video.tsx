import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Define video variants and their corresponding CSS classes.
 * @type {Function}
 */
const videoVariants = cva('w-full m-auto', {
  variants: {
    variant: {
      default: 'w-full',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement>, VariantProps<typeof videoVariants> {
  subtitles?: string;
}

const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
  ({ className, controls = false, subtitles, variant, ...props }, ref) => {
    return <video
      autoPlay={true}
      controls={controls}
      className={cn(videoVariants({ variant, className }))}
      ref={ref}
      {...props}
    >
      {subtitles && <track kind="subtitles" src={subtitles}/>}
      Your browser does not support the video tag.
    </video>;
  },
);

Video.displayName = 'Video';

export { Video };
