import styles from "./title.module.scss";

function WeatherForecastBox({ title, titleSpan }) {
  return (
    <h1 className={styles.title}>
      <span className={styles.titleSpan}>{titleSpan}</span>
      {title}
    </h1>
  );
}

export default WeatherForecastBox;
