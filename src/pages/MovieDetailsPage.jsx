import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { detailseMovie } from "../components/service/service";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const goBack = useRef(location?.state?.from ?? "/");
  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchDataDetalis = async () => {
      try {
        const response = await detailseMovie(movieId);

        setMovie(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataDetalis();
  }, [movieId]);

  const { title, overview, poster_path, release_date, genres } = movie;

  return (
    <section>
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      <Link to={goBack.current} className={styles.link}>
        Go Back
      </Link>
      {movie && (
        <div>
          <h2>{movie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width={250}
          />
          <p>Releas date: {release_date}</p>
          <p>{overview}</p>
          <p>
            Genres:{" "}
            {genres && genres.length > 0
              ? genres.map((genre) => genre.name).join(", ")
              : "No detalis"}
          </p>
          <nav className={styles.navDetails}>
            <Link to={"cast"} className={styles.link}>
              Cast
            </Link>
            <Link to={"reviews"} className={styles.link}>
              Reviews
            </Link>
          </nav>
        </div>
      )}
      <Outlet />
    </section>
  );
};

export default MovieDetailsPage;
