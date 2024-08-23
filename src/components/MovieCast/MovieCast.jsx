import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieCast } from "../service/service";
import Loader from "../Loader/Loader";
import imgNotFound from "./imgNotFound.jpg";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchMovieCast = async () => {
      try {
        const response = await movieCast(movieId);

        setCast(response.data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <section>
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {cast.length > 0 ? (
        <ul className={styles.castList}>
          {cast.map((actor) => (
            <li key={actor.id} className={styles.castItem}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                    : imgNotFound
                }
                alt={actor.name}
                width={150}
              />
              <div className={styles.castText}>
                <h4 className={styles.castName}>{actor.name}</h4>
                <p>Character: {actor.character}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No information</p>
      )}
    </section>
  );
};

export default MovieCast;
