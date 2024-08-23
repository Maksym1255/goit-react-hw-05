import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieReviews } from "../service/service";
import Loader from "../Loader/Loader";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchMovieReviews = async () => {
      try {
        const response = await movieReviews(movieId);

        setReviews(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieReviews();
  }, [movieId]);

  return (
    <section>
      {loading && <Loader />}
      {error && <p>Error: {error}</p>}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <h5 className={styles.reviewAutor}>{review.author}</h5>
              <p className={styles.reviewContent}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don`t have any reviews for this movie.</p>
      )}
    </section>
  );
};

export default MovieReviews;
