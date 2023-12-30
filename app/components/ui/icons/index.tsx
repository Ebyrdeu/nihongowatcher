import React, {memo} from "react";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";

export interface IconProps extends React.ComponentPropsWithoutRef<"svg"> {
    children: React.ReactNode;
    label: string;
    color?: string;
    strokeWidth?: number;
    fill?: string;
    className?: string;
    width?: number;
    height?: number;
}

const Icon = ({children, label, color, strokeWidth, fill, className, width, height}: IconProps) => (
    <AccessibleIcon.Root label={label}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width || 24}
            height={height || 24}
            viewBox="0 0 24 24"
            fill={fill || "#fff"}
            stroke={color || "#fff"}
            strokeWidth={strokeWidth || 2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className || "w-[100%] h-[100%]"}>
            {children}
        </svg>
    </AccessibleIcon.Root>
);

export const PlayIcon = memo(() => (
    <Icon label={"Play"}>
        <polygon points="5 3 19 12 5 21 5 3"/>
    </Icon>
));

export const PauseIcon = memo(() => (
    <Icon label={"Pause"}>
        <rect width="4" height="16" x="6" y="4"/>
        <rect width="4" height="16" x="14" y="4"/>
    </Icon>
));

export const SkipForwardIcon = memo(() => (
    <Icon fill={"none"} label={"Skip forward"}>
        <path d="M5 4l10 8-10 8V4zM19 5v14"/>
    </Icon>
));

export const VolumeMaxIcon = memo(() => (
    <Icon fill={"none"} label={"Volume maximum"}>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </Icon>
));

export const VolumeAverageIcon = memo(() => (
    <Icon fill={"none"} label={"Volume maximum"}>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </Icon>
));


export const VolumeLowIcon = memo(() => (
    <Icon fill={"none"} label={"Volume below 50%"}>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </Icon>
));

export const VolumeXIcon = memo(() => (
    <Icon fill={"none"} label={"Volume mute"}>
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
        <line x1="22" x2="16" y1="9" y2="15"/>
        <line x1="16" x2="22" y1="9" y2="15"/>
    </Icon>
));

export const AddVideoIcon = memo(() => (
    <Icon strokeWidth={0.1} label={"Add video"}>
        <path d="M2 18h10v2H2v-2zm0-7h20v2H2v-2zm0-7h20v2H2V4zm16 14v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"/>
    </Icon>
));

export const AddSubtitlesIcon = memo(() => (
    <Icon strokeWidth={0.1} label={"Add subtitle"}>
        <path
            d="M20 4a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h16m0 14V6H4v12h16M6 10h2v2H6v-2m0 4h8v2H6v-2m10 0h2v2h-2v-2m-6-4h8v2h-8v-2z"/>
    </Icon>
));

export const MinimizeIcon = memo(() => (
    <Icon strokeWidth={0.1} label={"Exit fullscreen"}>
        <path d="M9 9H3V7h4V3h2v6zM9 15H3v2h4v4h2v-6zM21 15h-6v6h2v-4h4v-2zM15 9h6V7h-4V3h-2v6z"/>
    </Icon>
));

export const MaximizeIcon = memo(() => (
    <Icon strokeWidth={0.1} label={"Enter fullscreen"}>
        <path d="M3 3h6v2H5v4H3V3zM3 21h6v-2H5v-4H3v6zM15 21h6v-6h-2v4h-4v2zM21 3h-6v2h4v4h2V3z"/>
    </Icon>
));

export const UploadIcon = memo(() => (
    <Icon color={"#EDE6D4"} className={"mb-2"} fill={"none"} height={128} width={128} strokeWidth={1}
          label={"Upload video"}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
        <path d="M12 12v6"/>
        <path d="m15 15-3-3-3 3"/>
    </Icon>
));
export const EpisodeListIcon = memo(() => (
    <Icon strokeWidth={0.1} label={"Episode List"}>
        <path fillRule="evenodd" clipRule="evenodd"
              d="M8 5H22V13H24V5C24 3.89543 23.1046 3 22 3H8V5ZM18 9H4V7H18C19.1046 7 20 7.89543 20 9V17H18V9ZM0 13C0 11.8954 0.895431 11 2 11H14C15.1046 11 16 11.8954 16 13V19C16 20.1046 15.1046 21 14 21H2C0.895431 21 0 20.1046 0 19V13ZM14 19V13H2V19H14Z"
        />
    </Icon>
));

PlayIcon.displayName = "PlayIcon";
PauseIcon.displayName = "PauseIcon";
SkipForwardIcon.displayName = "SkipForwardIcon";
VolumeMaxIcon.displayName = "VolumeMaxIcon";
VolumeLowIcon.displayName = "VolumeLowIcon";
VolumeXIcon.displayName = "VolumeXIcon";
AddVideoIcon.displayName = "AddVideoIcon";
AddSubtitlesIcon.displayName = "AddSubtitlesIcon";
MinimizeIcon.displayName = "MinimizeIcon";
MaximizeIcon.displayName = "MaximizeIcon";
UploadIcon.displayName = "UploadIcon";
EpisodeListIcon.displayName = "EpisodeListIcon";