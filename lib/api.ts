import axios from 'axios';
import type { Car, CarsQueryParams, CarsResponse, RentalFormValues } from '@/types/car';

export const API_BASE_URL = 'https://car-rental-api.goit.study';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

interface ApiLocation {
  country: string;
  city: string;
  address: string;
}

interface ApiCar {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string | number;
  engine?: string;
  engineSize?: string;
  accessories?: string[];
  functionalities?: string[];
  features?: string[];
  rentalPrice: string;
  rentalCompany: string;
  address?: string;
  location?: ApiLocation;
  rentalConditions: string[] | string;
  mileage: number;
}

interface ApiCarsResponse {
  cars: ApiCar[];
  totalCars: number;
  page: number | string;
  totalPages: number;
}

interface ApiFiltersResponse {
  brands: string[];
}

function toStringArray(value: string[] | string | undefined): string[] {
  if (Array.isArray(value)) {
    return value.map(String);
  }

  return value ? [value] : [];
}

function normalizeAddress(car: ApiCar): string {
  if (car.address) {
    return car.address;
  }

  if (!car.location) {
    return '';
  }

  return [car.location.address, car.location.city, car.location.country]
    .filter(Boolean)
    .join(', ');
}

function normalizeCar(car: ApiCar): Car {
  const accessories = toStringArray(car.accessories);
  const functionalities = toStringArray(car.functionalities);
  const features = toStringArray(car.features);

  return {
    id: car.id,
    year: car.year,
    brand: car.brand,
    model: car.model,
    type: car.type,
    img: car.img,
    description: car.description,
    fuelConsumption: String(car.fuelConsumption),
    engineSize: car.engineSize ?? car.engine ?? '',
    accessories,
    functionalities: functionalities.length > 0 ? functionalities : features,
    rentalPrice: car.rentalPrice,
    rentalCompany: car.rentalCompany,
    address: normalizeAddress(car),
    rentalConditions: toStringArray(car.rentalConditions),
    mileage: car.mileage
  };
}

export async function getCars(params: CarsQueryParams = {}): Promise<CarsResponse> {
  const { data } = await api.get<ApiCarsResponse>('/cars', {
    params: {
      page: params.page,
      brand: params.brand,
      minMileage: params.minMileage,
      maxMileage: params.maxMileage,
      perPage: params.limit,
      price: params.rentalPrice || undefined
    }
  });

  return {
    ...data,
    page: Number(data.page),
    cars: data.cars.map(normalizeCar)
  };
}

export async function getCarById(id: string): Promise<Car> {
  const { data } = await api.get<ApiCar>(`/cars/${id}`);
  return normalizeCar(data);
}

export async function getBrands(): Promise<string[]> {
  const { data } = await api.get<ApiFiltersResponse>('/cars/filters');
  return data.brands;
}

export async function bookCar(carId: string, values: RentalFormValues): Promise<void> {
  await api.post(`/cars/${carId}/booking-requests`, {
    name: values.name,
    email: values.email,
    comment: values.comment || undefined
  });
}
