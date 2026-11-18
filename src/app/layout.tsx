import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'FlexiCommerce & HyperLocal Multi-Vendor Platform',
  description: 'The Indian Multi-Channel Commerce OS — Web Storefront, iOS/Android Apps, Delivery Fleet App and Hyperlocal Admin Panel with 0% Commission.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Sora:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-orange-500 selection:text-white bg-[#FFFDFB] text-slate-900">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
