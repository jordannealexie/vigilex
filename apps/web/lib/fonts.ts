import { GeistSans as GeistSansFont, GeistMono as GeistMonoFont } from 'next/font/google';

export const GeistSans = GeistSansFont({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

export const GeistMono = GeistMonoFont({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});