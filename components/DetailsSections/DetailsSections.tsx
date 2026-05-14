import type { Car } from '@/types/car';
import { formatMileage, getCityCountry } from '@/lib/format';
import css from './DetailsSections.module.css';

function CheckIcon() {
  return <span className={css.check} aria-hidden="true">✓</span>;
}

export default function DetailsSections({ car }: { car: Car }) {
  const items = [...car.accessories, ...car.functionalities];

  return (
    <div className={css.wrap}>
      <section className={css.heroInfo}>
        <div className={css.titleRow}>
          <h1 className={css.title}>{car.brand} {car.model}, {car.year}</h1>
          <span className={css.id}>Id: {car.id.slice(0, 4)}</span>
        </div>
        <p className={css.meta}>⌖ {getCityCountry(car.address)} <span>Mileage: {formatMileage(car.mileage)} km</span></p>
        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.description}>{car.description}</p>
      </section>

      <section className={css.section} aria-labelledby="rental-conditions">
        <h2 id="rental-conditions" className={css.sectionTitle}>Rental Conditions:</h2>
        <ul className={css.list}>
          {car.rentalConditions.map(condition => <li key={condition}><CheckIcon />{condition}</li>)}
        </ul>
      </section>

      <section className={css.section} aria-labelledby="specifications">
        <h2 id="specifications" className={css.sectionTitle}>Car Specifications:</h2>
        <ul className={css.list}>
          <li>▣ Year: {car.year}</li>
          <li>▣ Type: {car.type}</li>
          <li>▣ Fuel Consumption: {car.fuelConsumption}</li>
          <li>⚙ Engine Size: {car.engineSize}</li>
        </ul>
      </section>

      <section className={css.section} aria-labelledby="accessories">
        <h2 id="accessories" className={css.sectionTitle}>Accessories and functionalities:</h2>
        <ul className={css.list}>
          {items.map(item => <li key={item}><CheckIcon />{item}</li>)}
        </ul>
      </section>
    </div>
  );
}
