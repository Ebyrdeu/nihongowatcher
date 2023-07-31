import './globals.css';
import {type Metadata} from 'next';
import {fontInter} from '@/lib/utils';

export const metadata: Metadata = {
  title: '日本語 Watcher',
  description: 'A Video Player to watch Japanese Videos',
};

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body className={fontInter.className}>{children}</body>
      </html>
  );
}
