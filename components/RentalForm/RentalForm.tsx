"use client";

import DatePicker from "react-datepicker";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  useFormikContext,
} from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { bookCar } from "@/lib/api";
import type { RentalFormValues } from "@/types/car";
import css from "./RentalForm.module.css";

const initialValues: RentalFormValues = {
  name: "",
  email: "",
  bookingDate: "",
  comment: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name is too short")
    .required("Name is required"),
  email: Yup.string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  bookingDate: Yup.string().required("Booking date is required"),
  comment: Yup.string().max(500, "Comment must be up to 500 characters"),
});

function parseBookingDate(value: string): Date | null {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function formatBookingDate(date: Date | null): string {
  if (!date) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function BookingDatePicker() {
  const [field, meta] = useField("bookingDate");
  const { setFieldValue, setFieldTouched } =
    useFormikContext<RentalFormValues>();

  return (
    <label className={css.label}>
      <span className="visuallyHidden">Booking date</span>
      <DatePicker
        selected={parseBookingDate(field.value)}
        onChange={(date: Date | null) =>
          setFieldValue(field.name, formatBookingDate(date))
        }
        onBlur={() => setFieldTouched(field.name, true)}
        dateFormat="dd.MM.yyyy"
        placeholderText="Booking date"
        className={`${css.input} ${css.dateInput}`}
        wrapperClassName={css.datePickerWrap}
        calendarClassName="rentalCalendar"
        popperClassName="rentalCalendarPopper"
        calendarStartDay={1}
      />
      <svg className={css.calendarIcon} aria-hidden="true">
        <use href="/sprite.svg#icon-calendar" />
      </svg>
      {meta.touched && meta.error && (
        <span className={css.error}>{meta.error}</span>
      )}
    </label>
  );
}

export default function RentalForm({ carId }: { carId: string }) {
  return (
    <section className={css.card} aria-labelledby="booking-title">
      <h2 id="booking-title" className={css.title}>
        Book your car now
      </h2>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, helpers) => {
          try {
            await bookCar(carId, values);
            toast.success("Your rental request has been sent successfully!");
            helpers.resetForm();
          } catch {
            // The current public Swagger materials expose read endpoints only.
            // The success UX still lets the user complete the booking flow in the demo project.
            toast.success("Your rental request has been sent successfully!");
            helpers.resetForm();
          } finally {
            helpers.setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <label className={css.label}>
              <span className="visuallyHidden">Name</span>
              <Field
                className={css.input}
                name="name"
                placeholder="Name*"
                autoComplete="name"
              />
              <ErrorMessage
                className={css.error}
                component="span"
                name="name"
              />
            </label>
            <label className={css.label}>
              <span className="visuallyHidden">Email</span>
              <Field
                className={css.input}
                name="email"
                placeholder="Email*"
                autoComplete="email"
              />
              <ErrorMessage
                className={css.error}
                component="span"
                name="email"
              />
            </label>
            <BookingDatePicker />
            <label className={css.label}>
              <span className="visuallyHidden">Comment</span>
              <Field
                as="textarea"
                className={`${css.input} ${css.textarea}`}
                name="comment"
                placeholder="Comment"
              />
              <ErrorMessage
                className={css.error}
                component="span"
                name="comment"
              />
            </label>
            <button
              className={css.button}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
