import { nanoid } from "nanoid";
import WeatherDayItem from "./WeatherDayItem";
import styles from "./weatherEveryDayList.module.scss";

function WeatherEveryDayList({ weatherEveryDay }) {
  console.log(
    "weatherEveryDay in WeatherEveryDayList >>>>> weatherEveryDay  ",
    weatherEveryDay
  );
  const { days } = weatherEveryDay;
  console.log("weatherEveryDay in WeatherEveryDayList >>>>> DAYS  ", days);

  const elements = days?.map((day) => (
    <WeatherDayItem key={nanoid()} props={day} />
  ));

  return (
    <>
      <h3 className={styles.title}>Week</h3>
      <ul className={styles.list}>{elements}</ul>
    </>
  );
}

export default WeatherEveryDayList;
