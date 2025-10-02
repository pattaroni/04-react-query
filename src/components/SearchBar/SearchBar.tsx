import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const query = formData.get("query") as string;
    if (query.trim() === "") {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(query.trim());
  };
  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <Toaster
            position="top-center"
            toastOptions={{
              className: "",
              duration: 1000,
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
          <Toaster
            position="top-center"
            toastOptions={{
              className: "",
              duration: 1000,
              removeDelay: 1000,
            }}
          />
          <form className={css.form} action={handleSubmit}>
            <input
              className={css.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={css.button} type="submit">
              Search
            </button>
          </form>
        </div>
      </header>
    </>
  );
}
