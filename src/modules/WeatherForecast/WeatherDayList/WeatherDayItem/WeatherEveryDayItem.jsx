import { icons } from "../../../../data/icons";
import { getDayWeek } from "../../../../shared/services/getDayWeek";

import styles from "./weatherEveryDayItem.module.scss";

function WeatherEveryDayItem({ datetime, tempmax, tempmin, icon }) {
  console.log("data in WeatherEveryDayItem datetime >>>>>", datetime);
  console.log("data in WeatherEveryDayItem tempmax >>>>>", tempmax);
  console.log("data in WeatherEveryDayItem tempmin >>>>>", tempmin);
  console.log("data in WeatherEveryDayItem icon >>>>>", icon);
  //   const dayWeek = getDayWeek(datetime);

  return (
    <li className={styles.item}>
      <p className={styles.text}>{getDayWeek(datetime)}</p>
      {icons.map((el) => {
        if (el.iconName === icon)
          return (
            <img
              className={styles.img}
              src={el.iconSrc}
              alt={el.icon}
              width={40}
              height={40}
            />
          );
      })}

      <span className={styles.temp}>
        {`${Math.round(tempmax)}°/${Math.round(tempmin)}°`}
      </span>
    </li>
  );
}

export default WeatherEveryDayItem;
