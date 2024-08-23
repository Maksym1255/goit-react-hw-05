import { Field, Formik } from "formik";
import styles from "./SearchBar.module.css";

const INITIAL_VALUE = {
  query: "",
};

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSearch(values.query);
    resetForm();
  };

  return (
    <Formik initialValues={INITIAL_VALUE} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            <Field
              type="text"
              name="query"
              placeholder="Search movies"
              className={styles.input}
            />
          </label>
          <button type="submit" className={styles.btn}>
            Search
          </button>
        </form>
      )}
    </Formik>
  );
};

export default SearchBar;
