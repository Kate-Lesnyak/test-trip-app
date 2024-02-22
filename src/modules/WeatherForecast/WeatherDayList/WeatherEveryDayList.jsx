import { nanoid } from "nanoid";
import WeatherDayItem from "./WeatherDayItem";
import styles from "./weatherEveryDayList.module.scss";

function WeatherEveryDayList({ weatherEveryDay }) {
  const elements = weatherEveryDay?.map(({ ...props }) => (
    <WeatherDayItem key={nanoid()} {...props} />
  ));

  return (
    <>
      <h3 className={styles.title}>Week</h3>
      <ul className={styles.list}>{elements}</ul>
    </>
  );
}

export default WeatherEveryDayList;
