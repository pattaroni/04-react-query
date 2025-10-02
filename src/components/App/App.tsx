import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import toast from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [clickedMovie, setClickedMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState<string>("");
  const { data, isError, isLoading, isSuccess } = useQuery<Movie[]>({
    queryKey: ["myFunction", query],
    queryFn: () => fetchMovies(query),
    enabled: query !== "",
  });

  useEffect(() => {
    if (isError) toast.error("Error fetching movies");
  }, [isError]);

  useEffect(() => {
    if (isSuccess && data.length === 0)
      toast.error("No movies found for your request.");
  }, [data, isSuccess]);

  const handleMovies = (query: string) => {
    setQuery(query);
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
      {data && <MovieGrid movies={data} onSelect={movieClick} />}
      {isModalOpen && clickedMovie && (
        <MovieModal movie={clickedMovie} onClose={modalClose} />
      )}
    </>
  );
}

export default App;
