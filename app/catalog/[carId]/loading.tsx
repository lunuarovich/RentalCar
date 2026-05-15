import Container from "@/components/Container/Container";
import Loader from "@/components/Loader/Loader";
import css from "./DetailsPage.module.css";

export default function Loading() {
  return (
    <main className={css.page}>
      <Container>
        <div className={css.error}>
          <Loader />
        </div>
      </Container>
    </main>
  );
}
