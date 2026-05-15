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
- Rental form with Formik + Yup validation, React Datepicker and success notification.
- Semantic markup, metadata and loader states for asynchronous requests.
- Responsive mobile-first layout with tablet and desktop breakpoints.

## Tech stack

- Next.js
- TypeScript
- TanStack Query
- Axios
- Formik + Yup
- React Select
- React Datepicker
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
https://car-rental-api.goit.global
```

Implemented API usage:

- `GET /cars` - catalog list with pagination and filters.
- `GET /cars/:id` - details for one car.
- `GET /brands` - brand options for the catalog filter.

### Booking form note

The public API documentation exposes read endpoints only and does not provide a booking endpoint. The rental form is still implemented and validated on the frontend, and the API layer is prepared to send a booking request to `POST /rentals` if such an endpoint becomes available.

In the current demo version, the form shows a success notification after submit even when the public API rejects the booking request. This keeps the user flow complete for the educational project while making the backend limitation explicit here.

## Author

Maksym Martynchuk
