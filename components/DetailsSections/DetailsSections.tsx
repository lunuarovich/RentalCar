import type { Car } from '@/types/car';
import { formatMileage, getCityCountry } from '@/lib/format';
import css from './DetailsSections.module.css';

function Icon({ name, className = css.icon }: { name: string; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
}

function CheckIcon() {
  return <Icon name="icon-check-circle" className={css.check} />;
}

export default function DetailsSections({ car }: { car: Car }) {
  const items = [...car.accessories, ...car.functionalities];

  return (
    <section className={css.wrap}>
      <div className={css.heroInfo}>
        <div className={css.titleRow}>
          <h1 className={css.title}>{car.brand} {car.model}, {car.year}</h1>
          <span className={css.id}>Id: {car.id.slice(0, 4)}</span>
        </div>
        <p className={css.meta}>
          <span className={css.metaItem}><Icon name="icon-Location" />{getCityCountry(car.address)}</span>
          <span>Mileage: {formatMileage(car.mileage)} km</span>
        </p>
        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.description}>{car.description}</p>
      </div>

      <div className={css.section} aria-labelledby="rental-conditions">
        <h2 id="rental-conditions" className={css.sectionTitle}>Rental Conditions:</h2>
        <ul className={css.list}>
          {car.rentalConditions.map(condition => <li key={condition}><CheckIcon />{condition}</li>)}
        </ul>
      </div>

      <div className={css.section} aria-labelledby="specifications">
        <h2 id="specifications" className={css.sectionTitle}>Car Specifications:</h2>
        <ul className={css.list}>
          <li><Icon name="icon-calendar" />Year: {car.year}</li>
          <li><Icon name="icon-car" />Type: {car.type}</li>
          <li><Icon name="icon-fuel-pump" />Fuel Consumption: {car.fuelConsumption}</li>
          <li><Icon name="icon-gear" />Engine Size: {car.engineSize}</li>
        </ul>
      </div>

      <div className={css.section} aria-labelledby="accessories">
        <h2 id="accessories" className={css.sectionTitle}>Accessories and functionalities:</h2>
        <ul className={css.list}>
          {items.map(item => <li key={item}><CheckIcon />{item}</li>)}
        </ul>
      </div>
    </section>
  );
}
