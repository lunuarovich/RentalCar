'use client';

import { Formik, Form, Field } from 'formik';
import { useQuery } from '@tanstack/react-query';
import { getBrands } from '@/lib/api';
import css from './CatalogFilters.module.css';

export interface FilterValues {
  brand: string;
  rentalPrice: string;
  minMileage: string;
  maxMileage: string;
}

interface CatalogFiltersProps {
  initialValues: FilterValues;
  onSubmit: (values: FilterValues) => void;
}

const PRICES = ['30', '40', '50', '60', '70', '80'];

export default function CatalogFilters({ initialValues, onSubmit }: CatalogFiltersProps) {
  const { data: brands = [] } = useQuery({ queryKey: ['brands'], queryFn: getBrands });

  return (
    <Formik<FilterValues> enableReinitialize initialValues={initialValues} onSubmit={onSubmit}>
      {({ resetForm }) => (
        <Form className={css.form}>
          <label className={css.field}>
            <span className={css.label}>Car brand</span>
            <Field as="select" name="brand" className={css.select} aria-label="Choose car brand">
              <option value="">Choose a brand</option>
              {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
            </Field>
          </label>

          <label className={css.field}>
            <span className={css.label}>Price/ 1 hour</span>
            <Field as="select" name="rentalPrice" className={css.select} aria-label="Choose rental price">
              <option value="">Choose a price</option>
              {PRICES.map(price => <option key={price} value={price}>To ${price}</option>)}
            </Field>
          </label>

          <fieldset className={css.mileageGroup}>
            <legend className={css.label}>Car mileage / km</legend>
            <div className={css.mileageInputs}>
              <Field className={css.input} name="minMileage" inputMode="numeric" placeholder="From" aria-label="Mileage from" />
              <Field className={css.input} name="maxMileage" inputMode="numeric" placeholder="To" aria-label="Mileage to" />
            </div>
          </fieldset>

          <button className={css.searchButton} type="submit">Search</button>
          <button className={css.resetButton} type="button" onClick={() => { resetForm({ values: { brand: '', rentalPrice: '', minMileage: '', maxMileage: '' } }); onSubmit({ brand: '', rentalPrice: '', minMileage: '', maxMileage: '' }); }}>
            Reset
          </button>
        </Form>
      )}
    </Formik>
  );
}
