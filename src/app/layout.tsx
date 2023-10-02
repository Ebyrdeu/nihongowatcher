import './globals.css';

import { type Metadata } from 'next';
import { fontInter } from '@/lib/utils';

/**
 * Metadata object for defining metadata information for the website.
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: '日本語 Watcher',
  description: 'A Video Player to watch Japanese Videos',
};

/**
 * RootLayout component for wrapping the entire application's content.
 * @component
 * @param {Object} props - The props for the RootLayout component.
 * @param {React.ReactNode} props.children - The children components to be wrapped.
 * @returns {JSX.Element} The rendered RootLayout component.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <body className={fontInter.className}>{children}</body>
      </html>
  );
}
