# RentalCar

Frontend application for a car rental company. The project is built with Next.js App Router, TypeScript, TanStack Query and CSS Modules.

## Features

- Home page with hero section and CTA to the catalog.
- Catalog page with backend-loaded car cards.
- Backend filtering by brand, rental price and mileage range.
- Infinite loading via `useInfiniteQuery` and Load More button.
- Car details page opened from catalog cards in a new browser tab.
- Rental form with Formik + Yup validation and success notification.
- Semantic markup, metadata and loader states for asynchronous requests.

## Tech stack

- Next.js
- TypeScript
- TanStack Query
- Axios
- Formik + Yup
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

## Author

Maksym Martynchuk
