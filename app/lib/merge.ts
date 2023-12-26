import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

/**
 * Merges multiple CSS class values using Tailwind CSS class merging and
 * combines them into a single space-separated string.
 * @param {...ClassValue} inputs - CSS class values to be merged.
 * @returns {string} The merged CSS classes as a string.
 */
export const cn = (...inputs: ClassValue[]): string => {
    return twMerge(clsx(inputs));
};
