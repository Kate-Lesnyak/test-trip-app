import styles from "./error.module.scss";

function Error({ error }) {
  return <div className={styles.error}>{error}</div>;
}

export default Error;
