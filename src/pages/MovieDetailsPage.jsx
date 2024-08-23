import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { detailseMovie } from "../components/service/service";
import styles from "./MovieDetailsPage.module.css";

const defaultImg =
  "https://images.hdqwalls.com/wallpapers/water-through-rocks-4k-kl.jpg";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const goBack = useRef(location?.state?.from ?? "/");
  useEffect(() => {
    setError(null);

    const fetchDataDetalis = async () => {
      setLoading(true);
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
          <div className={styles.textContainer}>
            <h2 className={styles.title}>{movie.title}</h2>
            <div className={styles.posterContainer}>
              <img
                className={styles.poster}
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : defaultImg
                }
                alt={title}
                width={250}
              />
              <div className={styles.releasContainer}>
                <p className={styles.releas}>
                  <b>Releas date: {release_date}</b>
                </p>
                <p className={styles.overview}>{overview}</p>
                <p className={styles.genres}>
                  Genres:{" "}
                  {genres && genres.length > 0
                    ? genres.map((genre) => genre.name).join(", ")
                    : "No detalis"}
                </p>
              </div>
            </div>
          </div>

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
