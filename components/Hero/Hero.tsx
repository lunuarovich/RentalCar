import Image from 'next/image';
import Link from 'next/link';
import css from './Hero.module.css';

export default function Hero() {
  return (
    <section className={css.hero}>
      <Image
        className={css.image}
        src="/HeroCar.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
      />
      <div className={css.overlay} />
      <div className={css.content}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>Reliable and budget-friendly rentals for any journey</p>
        <Link className={css.button} href="/catalog">View Catalog</Link>
      </div>
    </section>
  );
}
