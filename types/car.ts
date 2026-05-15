export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export interface CarsQueryParams {
  page?: number;
  limit?: number;
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
}

export interface RentalFormValues {
  name: string;
  email: string;
  comment: string;
}
