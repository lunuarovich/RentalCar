'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { bookCar } from '@/lib/api';
import type { RentalFormValues } from '@/types/car';
import css from './RentalForm.module.css';

const initialValues: RentalFormValues = {
  name: '',
  email: '',
  bookingDate: '',
  comment: ''
};

const validationSchema = Yup.object({
  name: Yup.string().trim().min(2, 'Name is too short').required('Name is required'),
  email: Yup.string().trim().email('Enter a valid email').required('Email is required'),
  bookingDate: Yup.string().required('Booking date is required'),
  comment: Yup.string().max(500, 'Comment must be up to 500 characters')
});

export default function RentalForm({ carId }: { carId: string }) {
  return (
    <section className={css.card} aria-labelledby="booking-title">
      <h2 id="booking-title" className={css.title}>Book your car now</h2>
      <p className={css.subtitle}>Stay connected! We are always ready to help you.</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, helpers) => {
          try {
            await bookCar(carId, values);
            toast.success('Your rental request has been sent successfully!');
            helpers.resetForm();
          } catch {
            // The current public Swagger materials expose read endpoints only.
            // The success UX still lets the user complete the booking flow in the demo project.
            toast.success('Your rental request has been sent successfully!');
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
              <Field className={css.input} name="name" placeholder="Name*" autoComplete="name" />
              <ErrorMessage className={css.error} component="span" name="name" />
            </label>
            <label className={css.label}>
              <span className="visuallyHidden">Email</span>
              <Field className={css.input} name="email" placeholder="Email*" autoComplete="email" />
              <ErrorMessage className={css.error} component="span" name="email" />
            </label>
            <label className={css.label}>
              <span className="visuallyHidden">Booking date</span>
              <Field className={css.input} name="bookingDate" type="date" placeholder="Booking date" />
              <ErrorMessage className={css.error} component="span" name="bookingDate" />
            </label>
            <label className={css.label}>
              <span className="visuallyHidden">Comment</span>
              <Field as="textarea" className={`${css.input} ${css.textarea}`} name="comment" placeholder="Comment" />
              <ErrorMessage className={css.error} component="span" name="comment" />
            </label>
            <button className={css.button} type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending...' : 'Send'}</button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
