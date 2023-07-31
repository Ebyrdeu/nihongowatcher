import {type NextFont} from 'next/dist/compiled/@next/font';
import {Inter} from 'next/font/google';

export const fontInter: NextFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});