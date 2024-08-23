import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div>
      <div className={styles.notFoundContainer}>
        <img
          className={styles.notFoundImg}
          src="https://thumbs.dreamstime.com/b/writing-note-showing-error-page-not-found-business-photo-showcasing-webpage-server-has-been-removed-moved-126767753.jpg"
          alt="404 - NOT FOUND"
        />
        <p>
          <b>The page you are looking for does not exist.</b>
        </p>
        <p className={styles.btnLink}>
          <Link to="/">Go back to the homepage</Link>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
