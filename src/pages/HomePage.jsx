import { useEffect, useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";
import { trendingMovieDay } from "../components/service/service";

const HomePage = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await trendingMovieDay();

        setMovieList(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <div>
        {movieList.length > 0 && <MovieList movieList={movieList} />}
        {loading && <Loader />}
        {error && <p>Error: {error}</p>}
      </div>
    </section>
  );
};

export default HomePage;
