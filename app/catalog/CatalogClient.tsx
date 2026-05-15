"use client";

import { useMemo, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Container from "@/components/Container/Container";
import CatalogFilters, {
  type FilterValues,
} from "@/components/CatalogFilters/CatalogFilters";
import CarCard from "@/components/CarCard/CarCard";
import LoadMoreButton from "@/components/LoadMoreButton/LoadMoreButton";
import Loader from "@/components/Loader/Loader";
import { getCars } from "@/lib/api";
import css from "./CatalogPage.module.css";

const LIMIT = 12;
const EMPTY_FILTERS: FilterValues = {
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
};

function sanitizeMileage(value: string) {
  return value.replace(/\D/g, "");
}

export default function CatalogClient() {
  const [filters, setFilters] = useState<FilterValues>(EMPTY_FILTERS);

  const queryParams = useMemo(
    () => ({
      brand: filters.brand || undefined,
      rentalPrice: filters.rentalPrice || undefined,
      minMileage: sanitizeMileage(filters.minMileage) || undefined,
      maxMileage: sanitizeMileage(filters.maxMileage) || undefined,
    }),
    [filters],
  );

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars", queryParams],
    queryFn: ({ pageParam }) =>
      getCars({
        page: pageParam,
        limit: LIMIT,
        ...queryParams,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCars = allPages.flatMap((page) => page.cars).length;

      if (loadedCars >= lastPage.totalCars) {
        return undefined;
      }

      if (lastPage.cars.length < LIMIT) {
        return undefined;
      }

      return allPages.length + 1;
    },
  });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  return (
    <main className={css.section}>
      <Container>
        <h1 className="visuallyHidden">Rental car catalog</h1>
        <CatalogFilters initialValues={filters} onSubmit={setFilters} />

        {isLoading && (
          <div className={css.center}>
            <Loader />
          </div>
        )}
        {isError && (
          <p className={css.message}>
            Something went wrong. Please try again later.
          </p>
        )}
        {!isLoading && !isError && cars.length === 0 && (
          <p className={css.message}>No cars found for selected filters.</p>
        )}

        {cars.length > 0 && (
          <>
            <ul className={css.grid}>
              {cars.map((car) => (
                <li className={css.item} key={car.id}>
                  <CarCard car={car} />
                </li>
              ))}
            </ul>
            {hasNextPage && (
              <LoadMoreButton
                onClick={() => fetchNextPage()}
                isLoading={isFetchingNextPage}
              />
            )}
          </>
        )}
      </Container>
    </main>
  );
}
