'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Container from '@/components/Container/Container';
import css from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <Container className={css.inner}>
        <Link href="/" className={css.logo} aria-label="RentalCar home">
          <svg className={css.logoIcon} aria-hidden="true">
            <use href="/sprite.svg#icon-Logo" />
          </svg>
        </Link>
        <nav className={css.nav} aria-label="Main navigation">
          <Link className={clsx(css.link, pathname === '/' && css.active)} href="/">Home</Link>
          <Link className={clsx(css.link, pathname.startsWith('/catalog') && css.active)} href="/catalog">Catalog</Link>
        </nav>
      </Container>
    </header>
  );
}
