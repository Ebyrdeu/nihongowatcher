'use client';
import React from 'react';

export interface IconsProps extends React.ComponentPropsWithoutRef<'svg'> {
  color?: string;
  stroke?: string;
  fill?: string;
  clasName?: string;
  width?: number;
  height?: number;
}

export function PlayIcon ({ color, stroke, fill, clasName, width, height }: IconsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={width ? width : '24'}
         height={height ? height : '24'}
         viewBox="0 0 24 24"
         fill={fill ? fill : 'none'}
         stroke={color ? color : '#EDE6D4'}
         strokeWidth={stroke ? stroke : 2}
         strokeLinecap="round"
         strokeLinejoin="round"
         className={clasName ? clasName : ''}>
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>

  );
}

export function PauseIcon ({ color, stroke, fill, clasName, width, height }: IconsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={width ? width : '24'}
         height={height ? height : '24'}
         viewBox="0 0 24 24"
         fill={fill ? fill : 'none'}
         stroke={color ? color : '#EDE6D4'}
         strokeWidth={stroke ? stroke : 2}
         strokeLinecap="round"
         strokeLinejoin="round"
         className={clasName ? clasName : ''}>
      <rect width="4" height="16" x="6" y="4"/>
      <rect width="4" height="16" x="14" y="4"/>
    </svg>
  );
}

export function SkipForwardIcon ({ color, stroke, fill, clasName, width, height }: IconsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={width ? width : '24'}
         height={height ? height : '24'}
         viewBox="0 0 24 24"
         fill={fill ? fill : 'none'}
         stroke={color ? color : '#EDE6D4'}
         strokeWidth={stroke ? stroke : 2}
         strokeLinecap="round"
         strokeLinejoin="round"
         className={clasName ? clasName : ''}>
      <polygon points="5 4 15 12 5 20 5 4"/>
      <line x1="19" x2="19" y1="5" y2="19"/>
    </svg>
  );
}

export function VolumeMaxIcon ({ color, stroke, fill, clasName, width, height }: IconsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={width ? width : '24'}
         height={height ? height : '24'}
         viewBox="0 0 24 24"
         fill={fill ? fill : 'none'}
         stroke={color ? color : '#EDE6D4'}
         strokeWidth={stroke ? stroke : 2}
         strokeLinecap="round"
         strokeLinejoin="round"
         className={clasName ? clasName : ''}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  );
}

export function VolumeLowIcon ({ color, stroke, fill, clasName, width, height }: IconsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={width ? width : '24'}
         height={height ? height : '24'}
         viewBox="0 0 24 24"
         fill={fill ? fill : 'none'}
         stroke={color ? color : '#EDE6D4'}
         strokeWidth={stroke ? stroke : 2}
         strokeLinecap="round"
         strokeLinejoin="round"
         className={clasName ? clasName : ''}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
    </svg>
  );
}

export function VolumeXIcon ({ color, stroke, fill, clasName, width, height }: IconsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={width ? width : '24'}
         height={height ? height : '24'}
         viewBox="0 0 24 24"
         fill={fill ? fill : 'none'}
         stroke={color ? color : '#EDE6D4'}
         strokeWidth={stroke ? stroke : 2}
         strokeLinecap="round"
         strokeLinejoin="round"
         className={clasName ? clasName : ''}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
      <line x1="22" x2="16" y1="9" y2="15"/>
      <line x1="16" x2="22" y1="9" y2="15"/>
    </svg>
  );
}

export function BadgePlusIcon ({ color, stroke, fill, clasName, width, height }: IconsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={width ? width : '24'}
         height={height ? height : '24'}
         viewBox="0 0 24 24"
         fill={fill ? fill : 'none'}
         stroke={color ? color : '#EDE6D4'}
         strokeWidth={stroke ? stroke : 2}
         strokeLinecap="round"
         strokeLinejoin="round"
         className={clasName ? clasName : ''}>
      <path
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
      <line x1="12" x2="12" y1="8" y2="16"/>
      <line x1="8" x2="16" y1="12" y2="12"/>
    </svg>
  );
}

export function SubtitlesIcon ({ color, stroke, fill, clasName, width, height }: IconsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={width ? width : '24'}
         height={height ? height : '24'}
         viewBox="0 0 24 24"
         fill={fill ? fill : 'none'}
         stroke={color ? color : '#EDE6D4'}
         strokeWidth={stroke ? stroke : 2}
         strokeLinecap="round"
         strokeLinejoin="round"
         className={clasName ? clasName : ''}>
      <path d="M7 13h4"/>
      <path d="M15 13h2"/>
      <path d="M7 9h2"/>
      <path d="M13 9h4"/>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z"/>
    </svg>
  );
}

export function MinimizeIcon ({ color, stroke, fill, clasName, width, height }: IconsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={width ? width : '24'}
         height={height ? height : '24'}
         viewBox="0 0 24 24"
         fill={fill ? fill : 'none'}
         stroke={color ? color : '#EDE6D4'}
         strokeWidth={stroke ? stroke : 2}
         strokeLinecap="round"
         strokeLinejoin="round"
         className={clasName ? clasName : ''}>
      <path d="M8 3v3a2 2 0 0 1-2 2H3"/>
      <path d="M21 8h-3a2 2 0 0 1-2-2V3"/>
      <path d="M3 16h3a2 2 0 0 1 2 2v3"/>
      <path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
    </svg>
  );
}

export function MaximizeIcon ({ color, stroke, fill, clasName, width, height }: IconsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={width ? width : '24'}
         height={height ? height : '24'}
         viewBox="0 0 24 24"
         fill={fill ? fill : 'none'}
         stroke={color ? color : '#EDE6D4'}
         strokeWidth={stroke ? stroke : 2}
         strokeLinecap="round"
         strokeLinejoin="round"
         className={clasName ? clasName : ''}>
      <path d="M8 3H5a2 2 0 0 0-2 2v3"/>
      <path d="M21 8V5a2 2 0 0 0-2-2h-3"/>
      <path d="M3 16v3a2 2 0 0 0 2 2h3"/>
      <path d="M16 21h3a2 2 0 0 0 2-2v-3"/>
    </svg>
  );
}

export function UploadIcon ({ color, stroke, fill, clasName, width, height }: IconsProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={width ? width : '24'}
         height={height ? height : '24'}
         viewBox="0 0 24 24"
         fill={fill ? fill : 'none'}
         stroke={color ? color : '#EDE6D4'}
         strokeWidth={stroke ? stroke : 2}
         strokeLinecap="round"
         strokeLinejoin="round"
         className={clasName ? clasName : ''}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <path d="M12 12v6"/>
      <path d="m15 15-3-3-3 3"/>
    </svg>
  );
}