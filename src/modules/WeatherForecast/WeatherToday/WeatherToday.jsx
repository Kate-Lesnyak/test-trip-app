import { getDayWeek } from "../../../shared/services/getDayWeek";
import { icons } from "../../../data/icons";

import styles from "./weatherToday.module.scss";

function WeatherToday({ searchWeatherToday }) {
  console.log(
    "searchWeatherToday in WeatherToday >>>> searchWeatherToday",
    searchWeatherToday
  );

  const { address, days } = searchWeatherToday;
  let data = {};
  if (days) {
    data = days[0];
  }
  const datetime = data?.datetime;
  const icon = data?.icon;
  const temp = data?.temp;
  const iconChoiced = icons.find((el) => el.iconName === icon);

  //   console.log(iconChoiced);

  console.log("searchWeatherToday in WeatherToday >>>> address", address);
  console.log("searchWeatherToday in WeatherToday >>>> days", days);
  console.log("searchWeatherToday in WeatherToday >>>> data", data);

  return (
    <div>
      <div className={styles.avatar}></div>
      <div className={styles.dayWeek}>{getDayWeek(datetime)}</div>
      <div className={styles.thumb}>
        <img src={iconChoiced?.iconSrc} alt={icon} width={70} height={70} />
        <div className={styles.temp}>{Math.round(temp)}</div>
        <div className={styles.celsii}>
          <span>°</span>
          <span>C</span>
        </div>
      </div>
      <p className={styles.address}>{address}</p>
    </div>
  );
}

export default WeatherToday;
