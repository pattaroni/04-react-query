import css from "./App.module.css";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import {
  fetchMovies,
  type MovieHttpResponse,
} from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [clickedMovie, setClickedMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isError, isLoading, isSuccess } = useQuery<MovieHttpResponse>({
    queryKey: ["movies", query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== "",
    placeholderData: currentPage > 1 ? keepPreviousData : undefined,
  });

  const total_pages = data?.total_pages ?? 0;

  useEffect(() => {
    if (isError) toast.error("Error fetching movies");
  }, [isError]);

  useEffect(() => {
    if (isSuccess && data.results.length === 0)
      toast.error("No movies found for your request.");
  }, [data, isSuccess]);

  const handleMovies = (query: string) => {
    setQuery(query);
    setCurrentPage(1);
  };

  const modalOpen = () => setIsModalOpen(true);
  const modalClose = () => {
    setIsModalOpen(false);
    setClickedMovie(null);
  };

  const movieClick = (movie: Movie) => {
    setClickedMovie(movie);
    modalOpen();
  };

  return (
    <>
      <SearchBar onSubmit={handleMovies} />
      {isSuccess && total_pages > 1 && (
        <ReactPaginate
          pageCount={total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={movieClick} />
      )}
      {isModalOpen && clickedMovie && (
        <MovieModal movie={clickedMovie} onClose={modalClose} />
      )}
    </>
  );
}

export default App;
