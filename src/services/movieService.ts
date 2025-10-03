import axios from "axios";
import type { Movie } from "../types/movie";

export interface MovieHttpResponse {
  results: Movie[];
  total_pages: number;
}

const token = import.meta.env.VITE_TMDB_TOKEN;

export async function fetchMovies(
  query: string,
  page: number
): Promise<MovieHttpResponse> {
  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.request<MovieHttpResponse>(options);
  return response.data;
}
