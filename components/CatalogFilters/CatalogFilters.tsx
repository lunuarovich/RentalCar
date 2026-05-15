"use client";

import { Formik, Form, Field } from "formik";
import { useQuery } from "@tanstack/react-query";
import Select, {
  components,
  type DropdownIndicatorProps,
  type SingleValue,
} from "react-select";
import { getBrands } from "@/lib/api";
import css from "./CatalogFilters.module.css";

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

const PRICES = ["30", "40", "50", "60", "70", "80"];

interface SelectOption {
  value: string;
  label: string;
}

function DropdownIndicator(props: DropdownIndicatorProps<SelectOption, false>) {
  const iconId = props.selectProps.menuIsOpen ? "icon-Up-Active" : "icon-Up-Default";

  return (
    <components.DropdownIndicator {...props}>
      <svg className={css.selectIcon} aria-hidden="true">
        <use href={`/sprite.svg#${iconId}`} />
      </svg>
    </components.DropdownIndicator>
  );
}

const selectComponents = {
  DropdownIndicator,
  IndicatorSeparator: null,
};

export default function CatalogFilters({
  initialValues,
  onSubmit,
}: CatalogFiltersProps) {
  const { data: brands = [] } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
  const brandOptions = brands.map((brand) => ({ value: brand, label: brand }));
  const priceOptions = PRICES.map((price) => ({
    value: price,
    label: `To $${price}`,
  }));

  return (
    <Formik<FilterValues>
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ resetForm, setFieldValue, values }) => (
        <Form className={css.form}>
          <label className={css.field}>
            <span className={css.label} id="brand-select-label">Car brand</span>
            <Select<SelectOption, false>
              aria-labelledby="brand-select-label"
              className={css.select}
              classNamePrefix="catalogSelect"
              components={selectComponents}
              inputId="brand-select"
              instanceId="brand-select"
              isSearchable={false}
              name="brand"
              onChange={(option: SingleValue<SelectOption>) => {
                setFieldValue("brand", option?.value ?? "");
              }}
              options={brandOptions}
              placeholder="Choose a brand"
              value={brandOptions.find((option) => option.value === values.brand) ?? null}
            />
          </label>

          <label className={css.field}>
            <span className={css.label} id="price-select-label">Price/ 1 hour</span>
            <Select<SelectOption, false>
              aria-labelledby="price-select-label"
              className={css.select}
              classNamePrefix="catalogSelect"
              components={selectComponents}
              inputId="price-select"
              instanceId="price-select"
              isSearchable={false}
              name="rentalPrice"
              onChange={(option: SingleValue<SelectOption>) => {
                setFieldValue("rentalPrice", option?.value ?? "");
              }}
              options={priceOptions}
              placeholder="Choose a price"
              value={priceOptions.find((option) => option.value === values.rentalPrice) ?? null}
            />
          </label>

          <fieldset className={css.mileageGroup}>
            <legend className={css.label}>Car mileage / km</legend>
            <div className={css.mileageInputs}>
              <Field
                className={css.input}
                name="minMileage"
                inputMode="numeric"
                placeholder="From"
                aria-label="Mileage from"
              />
              <Field
                className={css.input}
                name="maxMileage"
                inputMode="numeric"
                placeholder="To"
                aria-label="Mileage to"
              />
            </div>
          </fieldset>

          <button className={css.searchButton} type="submit">
            Search
          </button>
          <button
            className={css.resetButton}
            type="button"
            onClick={() => {
              resetForm({
                values: {
                  brand: "",
                  rentalPrice: "",
                  minMileage: "",
                  maxMileage: "",
                },
              });
              onSubmit({
                brand: "",
                rentalPrice: "",
                minMileage: "",
                maxMileage: "",
              });
            }}
          >
            Reset
          </button>
        </Form>
      )}
    </Formik>
  );
}
