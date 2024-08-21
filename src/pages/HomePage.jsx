import axios from "axios";

import { useEffect, useState } from "react";
import MovieList from "../components/MovieList/MovieList";
import Loader from "../components/Loader/Loader";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzE3NDEzYjBjZmY2MTI5NzgyNjU2Y2Q1M2EyNjRjYyIsIm5iZiI6MTcyNDIzMTc2MC4yNDQzMiwic3ViIjoiNjZjNGFlZDdlZjMwN2JmZGJiZDE4YzYzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.pUIkrW9YuubBhy7xDiwF0CO5T5jYQzLHOxHCHQ2yXf0";

const HomePage = () => {
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      const url =
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
      const options = {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      };
      try {
        const response = await axios.get(url, options);
        console.log(response.data.results);

        setMovieList(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // console.log(movieList);

  return (
    <section>
      <div>
        {movieList.length > 0 && <MovieList movieList={movieList} />}
        {loading && <Loader />}
        {error && <h1>Error</h1>}
      </div>
    </section>
  );
};

export default HomePage;
