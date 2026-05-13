import type { Metadata } from 'next';
import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'Choose a rental car by brand, price and mileage.',
  alternates: { canonical: '/catalog' }
};

export default function CatalogPage() {
  return <CatalogClient />;
}
