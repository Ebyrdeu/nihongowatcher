import React from 'react';
import {cva, VariantProps} from 'class-variance-authority';
import {cn} from '@/lib/utils';

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

/**
 * Props for the Video component, extending React's video attributes
 * and including variant props from `videoVariants`.
 * @interface VideoProps
 * @extends React.VideoHTMLAttributes<HTMLVideoElement>
 * @extends VariantProps<typeof videoVariants>
 */
export interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement>, VariantProps<typeof videoVariants> {
  subtitles?: string;
}

/**
 * Video component for rendering HTML5 video elements.
 * @component
 * @param {VideoProps} props - The props for the Video component.
 * @param {string} props.className - Additional CSS classes for customization.
 * @param {boolean} props.controls - Whether to display native video controls.
 * @param {string} props.variant - The variant of the video.
 * @param {string} props.subtitles - The URL to the WebVTT subtitle file.
 * @param {React.Ref<HTMLVideoElement>} ref - The React ref for the video element.
 * @returns {JSX.Element} The rendered Video component.
 */
const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
    ({className, controls = false, subtitles, variant, ...props}, ref) => {
      return <video
          autoPlay={true}
          controls={controls}
          className={cn(videoVariants({variant, className}))}
          ref={ref}
          {...props}
      >
        {subtitles && <track kind="subtitles" src={subtitles}/>}
        Your browser does not support the video tag.
      </video>;
    },
);

// Display name for the Video component
Video.displayName = 'Video';

export {Video};
