import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/Container/Container';
import RentalForm from '@/components/RentalForm/RentalForm';
import DetailsSections from '@/components/DetailsSections/DetailsSections';
import { getCarById } from '@/lib/api';
import css from './DetailsPage.module.css';

interface DetailsPageProps {
  params: { carId: string };
}

export async function generateMetadata({ params }: DetailsPageProps): Promise<Metadata> {
  const { carId } = params;
  try {
    const car = await getCarById(carId);
    return {
      title: `${car.brand} ${car.model}, ${car.year}`,
      description: car.description,
      alternates: { canonical: `/catalog/${car.id}` },
      openGraph: {
        title: `${car.brand} ${car.model}, ${car.year}`,
        description: car.description,
        images: [{ url: car.img }]
      }
    };
  } catch {
    return { title: 'Car details' };
  }
}

export default async function DetailsPage({ params }: DetailsPageProps) {
  const { carId } = params;
  const car = await getCarById(carId);

  return (
    <main className={css.page}>
      <Container>
        <div className={css.grid}>
          <div>
            <div className={css.imageWrap}>
              <Image className={css.image} src={car.img} alt={`${car.brand} ${car.model}`} fill priority sizes="640px" />
            </div>
            <RentalForm carId={car.id} />
          </div>
          <DetailsSections car={car} />
        </div>
      </Container>
    </main>
  );
}
