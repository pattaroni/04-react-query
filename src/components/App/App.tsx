import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [clickedMovie, setClickedMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const loaderShow = () => {
    setIsLoading(true);
  };
  const loaderHide = () => {
    setIsLoading(false);
  };

  const handleMovies = async (query: string) => {
    try {
      setIsError(false);
      loaderShow();
      const data = await fetchMovies(query);
      setMovies(data);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
    } catch (error) {
      toast.error("Error fetching movies");
      console.log(error);
      setIsError(true);
    } finally {
      loaderHide();
    }
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
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && (
        <MovieGrid movies={movies} onSelect={movieClick} />
      )}
      {isModalOpen && clickedMovie && (
        <MovieModal movie={clickedMovie} onClose={modalClose} />
      )}
    </>
  );
}

export default App;
