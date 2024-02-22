import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import TripItem from "./TripItem";

import styles from "./tripList.module.scss";

function TripList({
  trips,
  tripItem,
  onGetWeatherToday,
  onGetWeatherEveryDay,
  onDeleteTrip,
}) {
  const tripListRef = useRef(null);
  console.log("TripsList==>", trips); // приходит объект

  const handleScrollLeft = () => {
    tripListRef.current.scrollBy({
      top: 0,
      left: -250,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    tripListRef.current.scrollBy({
      top: 0,
      left: 250,
      behavior: "smooth",
    });
  };

  const elements = trips?.map(({ id, ...props }) => (
    <TripItem
      key={id}
      id={id}
      {...props}
      onDeleteTrip={onDeleteTrip}
      onGetWeatherToday={onGetWeatherToday}
      onGetWeatherEveryDay={onGetWeatherEveryDay}
    />
  ));

  return (
    <>
      {trips.length > 0 && (
        <FaChevronLeft
          className={styles.arrowLeft}
          onClick={handleScrollLeft}
        />
      )}
      <ul ref={tripListRef} className={styles.list}>
        {elements}
      </ul>
      {trips.length > 0 && (
        <FaChevronRight
          className={styles.arrowRight}
          onClick={handleScrollRight}
        />
      )}
    </>
  );
}

export default TripList;
