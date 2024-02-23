import { IoCloseOutline } from "react-icons/io5";
import { formatDateQuery } from "../../../../shared/services/formatDateQuery";
import { formatDate } from "../../../../shared/services/formatDate";

import cities from "../../../../data/cities.json";

import styles from "./tripItem.module.scss";

function TripItem({
  id,
  city,
  start,
  end,
  onGetWeatherToday,
  onGetWeatherEveryDay,
  onDeleteTrip,
}) {
  const formatedStart = formatDate(start);
  const formatedEnd = formatDate(end);

  return (
    <li
      className={styles.item}
      onClick={() => {
        onGetWeatherToday(city);
        onGetWeatherEveryDay(city, start, end);
      }}
    >
      <IoCloseOutline
        className={styles.btnDelete}
        onClick={() => onDeleteTrip(id)}
        size={20}
      />

      <div className={styles.thumb}>
        <img src={cities.find((el) => el.city === city).image} alt={city} />
      </div>
      <div className={styles.info}>
        <p className={styles.city}>{city}</p>
        <p className={styles.date}>{`${formatedStart} - ${formatedEnd}`}</p>
      </div>
    </li>
  );
}

export default TripItem;
