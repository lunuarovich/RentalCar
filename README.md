# RentalCar

Frontend application for a car rental company. The project is built with Next.js App Router, TypeScript, TanStack Query and CSS Modules.

## Features

- Home page with hero section and CTA to the catalog.
- Catalog page with backend-loaded car cards.
- Backend filtering by brand, rental price and mileage range.
- Infinite loading via `useInfiniteQuery` and Load More button.
- Car details page opened from catalog cards in a new browser tab.
- Favorite button state on catalog cards.
- Custom catalog selects built with React Select.
- Rental form with Formik + Yup validation and success notification.
- Semantic markup, metadata and loader states for asynchronous requests.
- Responsive mobile-first layout with tablet and desktop breakpoints.

## Tech stack

- Next.js
- TypeScript
- TanStack Query
- Axios
- Formik + Yup
- React Select
- React Hot Toast
- CSS Modules

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Production build

```bash
npm run build
npm start
```

## API

The app uses the public Rental Car API:

```txt
https://car-rental-api.goit.study
```

Implemented API usage:

- `GET /cars` - catalog list with pagination and filters.
- `GET /cars/:id` - details for one car.
- `GET /cars/filters` - available brand options for the catalog filter.
- `POST /cars/:carId/booking-requests` - rental booking request.

## Author

Maksym Martynchuk
