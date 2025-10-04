import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import type { FormikHelpers } from "formik";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

interface OrderFormValue {
  query: string;
}

const initialValue: OrderFormValue = {
  query: "",
};

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (
    value: OrderFormValue,
    actions: FormikHelpers<OrderFormValue>
  ) => {
    if (value.query.trim() === "") {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(value.query.trim());
    actions.resetForm();
  };
  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <Toaster
            position="top-center"
            toastOptions={{
              className: "",
              duration: 1500,
              removeDelay: 1000,
            }}
          />
          <a
            className={css.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TMDB
          </a>
          <Formik initialValues={initialValue} onSubmit={handleSubmit}>
            <Form className={css.form}>
              <Field
                className={css.input}
                type="text"
                name="query"
                placeholder="Search movies..."
                autoFocus
                autoComplete="off"
              />
              <button className={css.button} type="submit">
                Search
              </button>
            </Form>
          </Formik>
        </div>
      </header>
    </>
  );
}
