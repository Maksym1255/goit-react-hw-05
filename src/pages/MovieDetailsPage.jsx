import { useParams } from "react-router-dom";

const MovieDetailsPage = () => {
  const movieId = useParams();
  console.log(movieId);

  return <div>MovieDetailsPage</div>;
};

export default MovieDetailsPage;
