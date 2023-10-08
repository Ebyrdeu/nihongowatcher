import { type NextFont } from 'next/dist/compiled/@next/font';
import { Noto_Sans_JP } from 'next/font/google';

export const fontInter: NextFont = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-sans',
});
