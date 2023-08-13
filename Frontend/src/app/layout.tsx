import './globals.css';
import type { Metadata } from 'next';
import { Inter, Open_Sans } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';

import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });
const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'iShortn',
  description: `Power up your links with our AI-driven analytics, advanced URL
  shortening, and dynamic QR code creation and boost engagement
  results like never before. Unleash the power of your links today!`,
  authors: [
    {
      name: 'Kelvin Amoaba',
      url: 'https://www.kelvinamoaba.live',
    },
  ],
  applicationName: 'iShortn',
  creator: 'Kelvin Amoaba',
  robots: 'index, follow',
  category: 'Technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={openSans.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
