import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import Loader from "../components/Loader/Loader";
import MovieList from "../components/MovieList/MovieList";
import { movieSearch } from "../components/service/service";
import { useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    const searhMovies = async (query) => {
      setLoading(true);
      try {
        const response = await movieSearch(query);
        return setSearchResults(response.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    searhMovies(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchParams({ search: query });
  };

  return (
    <section>
      <SearchBar onSearch={handleSearch} initialValue={searchQuery || ""} />
      {loading && <Loader />}
      {error && <p>Error: {error.message}</p>}
      {!searchQuery && <p>Please enter a movie name to search.</p>}
      {searchResults.length > 0 && <MovieList movieList={searchResults} />}
      {searchResults.length === 0 && !loading && searchQuery && (
        <p>No results found for {searchQuery}.</p>
      )}
    </section>
  );
};

export default MoviesPage;
