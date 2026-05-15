'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { Car } from '@/types/car';
import { formatMileage, getAddressParts } from '@/lib/format';
import css from './CarCard.module.css';

export default function CarCard({ car }: { car: Car }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { city, country } = getAddressParts(car.address);
  const favoriteIcon = isFavorite ? 'icon-Heart-Active' : 'icon-Heart-Default';

  return (
    <article className={css.card}>
      <div className={css.imageWrap}>
        <Image className={css.image} src={car.img} alt={`${car.brand} ${car.model}`} fill sizes="(max-width: 768px) 100vw, 276px" />
        <button
          className={css.favorite}
          type="button"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={isFavorite}
          onClick={() => setIsFavorite((current) => !current)}
        >
          <svg className={css.favoriteIcon} aria-hidden="true">
            <use href={`/sprite.svg#${favoriteIcon}`} />
          </svg>
        </button>
      </div>
      <div className={css.heading}>
        <h2 className={css.title}>{car.brand} <span>{car.model}</span>, {car.year}</h2>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>
      <p className={css.meta}>{city} <span>|</span> {country} <span>|</span> {car.rentalCompany} <span>|</span></p>
      <p className={css.meta}>{car.type} <span>|</span> {formatMileage(car.mileage)} km</p>
      <Link className={css.button} href={`/catalog/${car.id}`} target="_blank" rel="noopener noreferrer">Read more</Link>
    </article>
  );
}
