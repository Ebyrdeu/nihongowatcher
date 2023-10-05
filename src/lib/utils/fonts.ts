import { type NextFont } from 'next/dist/compiled/@next/font';
import { Inter } from 'next/font/google';

/**
 * Represents the font configuration for Inter font.
 * @type {NextFont}
 */
export const fontInter: NextFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});
