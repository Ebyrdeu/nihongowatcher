import {clsx, type ClassValue} from 'clsx';
import {twMerge} from 'tailwind-merge';

// Helper for merging tailwind style classes
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}