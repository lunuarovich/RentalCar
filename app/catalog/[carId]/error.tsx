'use client';

import Container from '@/components/Container/Container';
import css from './DetailsPage.module.css';

export default function Error() {
  return <main className={css.page}><Container><p className={css.error}>Car not found or unavailable.</p></Container></main>;
}
