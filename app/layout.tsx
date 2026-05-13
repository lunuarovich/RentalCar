import type { Metadata } from 'next';
import Header from '@/components/Header/Header';
import Providers from '@/components/Providers/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'RentalCar — Car Rental Service',
    template: '%s | RentalCar'
  },
  description: 'Reliable and budget-friendly rental cars for any journey.',
  metadataBase: new URL('https://rental-car-next.vercel.app'),
  openGraph: {
    title: 'RentalCar — Car Rental Service',
    description: 'Find and book a rental car for your next journey.',
    url: '/',
    siteName: 'RentalCar',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
