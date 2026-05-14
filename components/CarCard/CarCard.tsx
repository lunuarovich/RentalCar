import Image from 'next/image';
import Link from 'next/link';
import type { Car } from '@/types/car';
import { formatMileage, getAddressParts } from '@/lib/format';
import css from './CarCard.module.css';

export default function CarCard({ car }: { car: Car }) {
  const { city, country } = getAddressParts(car.address);

  return (
    <article className={css.card}>
      <div className={css.imageWrap}>
        <Image className={css.image} src={car.img} alt={`${car.brand} ${car.model}`} fill sizes="(max-width: 768px) 100vw, 276px" />
        <button className={css.favorite} type="button" aria-label="Add to favorites">♡</button>
      </div>
      <div className={css.heading}>
        <h2 className={css.title}>{car.brand} <span>{car.model}</span>, {car.year}</h2>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>
      <p className={css.meta}>{city} <span>|</span> {country} <span>|</span> {car.rentalCompany} <span>|</span></p>
      <p className={css.meta}>{car.type} <span>|</span> {formatMileage(car.mileage)} km</p>
      <Link className={css.button} href={`/catalog/${car.id}`} rel="noopener noreferrer">Read more</Link>
    </article>
  );
}
