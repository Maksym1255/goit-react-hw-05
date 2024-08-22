import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movieList }) => {
  const location = useLocation();

  return (
    <ul className={styles.movieList}>
      {movieList.map((movie) => {
        return (
          <li key={movie.id} className={styles.movieItem}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              <div>
                <img
                  src={
                    movie.poster_path &&
                    `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  }
                  alt={movie.title}
                  width={350}
                  className={styles.movieImg}
                />

                <div className={styles.movieText}>
                  <h2 className={styles.movieTitle}>{movie.title}</h2>
                  <p className={styles.movieRelease}>
                    Release: {movie.release_date}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
