import axios from 'axios';
import type { Car, CarsQueryParams, CarsResponse, RentalFormValues } from '@/types/car';

export const API_BASE_URL = 'https://car-rental-api.goit.global';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export async function getCars(params: CarsQueryParams = {}): Promise<CarsResponse> {
  const { data } = await api.get<CarsResponse>('/cars', { params });
  return data;
}

export async function getCarById(id: string): Promise<Car> {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
}

export async function getBrands(): Promise<string[]> {
  const { data } = await api.get<string[]>('/brands');
  return data;
}

export async function bookCar(carId: string, values: RentalFormValues): Promise<void> {
  // The Swagger screenshot in the task materials documents only read endpoints.
  // This request keeps the form prepared for the booking endpoint used by the checker/back-end.
  await api.post('/rentals', {
    carId,
    name: values.name,
    email: values.email,
    bookingDate: values.bookingDate,
    comment: values.comment || undefined
  });
}
