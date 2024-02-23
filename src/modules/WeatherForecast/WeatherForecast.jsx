import { useState, useEffect, useRef } from "react";
import { Notify } from "notiflix";
import { nanoid } from "nanoid";

import Section from "../../shared/components/Section";
import Container from "../../shared/components/Container";
import Title from "./Title";
import SearchForm from "./SearchForm";
import Loader from "../../shared/components/Loader";
import Error from "../../shared/components/Error";
import TripList from "./TripList";
import WeatherEveryDayList from "./WeatherDayList";
import AddTripBtn from "./AddTripBtn/AddTripBtn";
import WeatherToday from "./WeatherToday/WeatherToday";
import Timer from "./Timer/Timer";
import Modal from "../../shared/components/Modal/Modal";
import ModalForm from "./ModalForm/ModalForm";

import { getTrip, getTripToday } from "../../shared/services/api";
import { getSorteredTrip } from "../../shared/services/getSorteredTrip";
import { getInitialValue } from "../../shared/utils/localStorage";

import styles from "./weatherForecast.module.scss";

const initialValue = [
  {
    id: nanoid(),
    city: "Amsterdam",
    start: "2024-03-01",
    end: "2024-03-07",
  },
];

function WeatherForecast() {
  const [trips, setTrips] = useState(() =>
    getInitialValue("my-trips", initialValue)
  );
  const [searchWeatherToday, setSearchWeatherToday] = useState({});
  const [weatherEveryDay, setWeatherEveryDay] = useState({});

  const [filter, setFilter] = useState(false);

  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("my-trips", JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    if (!(city && startDate && endDate)) {
      return;
    }

    const fetchTrip = async () => {
      try {
        setIsLoading(true);
        const data = await getTrip(city, startDate, endDate);
        console.log("data from useEffect fetchTrip =====>>", data);
        setWeatherEveryDay(data);
      } catch ({ response }) {
        const errorMessage =
          response.data.message || Notify.failure("Can not fetch trips");
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrip();
  }, [city, startDate, endDate, weatherEveryDay]);

  useEffect(() => {
    if (!city) {
      return;
    }

    const fetchTripToday = async () => {
      try {
        setIsLoading(true);
        const data = await getTripToday(city);
        console.log(
          "data from useEffect fetchTripToday ===>> setWeatherToday",
          data
        );
        setSearchWeatherToday(data);
      } catch ({ response }) {
        const errorMessage =
          response.data.message ||
          Notify.failure("Can not fetch weather today");
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTripToday();
  }, [city]);

  const toggleModal = () => {
    if (showModal) {
      document.body.classList.remove("modal-open");
    } else {
      document.body.classList.add("modal-open");
    }
    setShowModal(!showModal);
  };

  const onAddTrip = ({ city, start, end }) => {
    if (isDublicate({ city, start, end })) {
      return Notify.info(`${city} is already exist at time ${start} - ${end}`);
    }
    setCity(city);
    setStartDate(start);
    setEndDate(end);
    setTrips((prevTrips) => {
      const newTrip = {
        id: nanoid(),
        city,
        start,
        end,
      };
      console.log("prevTrips===>", prevTrips);
      return [...prevTrips, newTrip];
    });
  };

  const onDeleteTrip = (id) => {
    setTrips((prevTrips) => prevTrips.filter((item) => item.id !== id));
  };

  const onGetWeatherToday = (city) => {
    console.log("Функции onGetWeather Today ==>", city);
    setCity(city);
  };

  const onGetWeatherEveryDay = (city, start, end) => {
    setCity(city);
    setStartDate(start);
    setEndDate(end);
    console.log("Функция onGetWeather EveryDay ==>", city, start, end);
  };

  const handleFilter = ({ target }) => setFilter(target.value);

  const getFilteredTrips = () => {
    if (!filter) {
      return trips;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = trips.filter((trip) =>
      trip.city.toLowerCase().includes(normalizedFilter)
    );
    return result;
  };

  const isDublicate = ({ city, start, end }) => {
    const normalizedCity = city.toLowerCase();

    const dublicate = trips.find((item) => {
      return (
        item.city.toLowerCase() === normalizedCity &&
        item.start === start &&
        item.end === end
      );
    });

    return Boolean(dublicate);
  };

  const tripsFiltered = getFilteredTrips();
  const getSorteredTrips = tripsFiltered.sort(getSorteredTrip);

  return (
    <Section>
      <Container>
        <div className={styles.wrap}>
          {isLoading && <Loader />}
          {error && <Error error={error} />}
          <div>
            <Title titleSpan="Weather" title="Forecast" />
            <SearchForm value={filter} onChange={handleFilter} />
            <div className={styles.boxTripList}>
              <TripList
                trips={getSorteredTrips}
                onGetWeatherToday={onGetWeatherToday}
                onGetWeatherEveryDay={onGetWeatherEveryDay}
                onDeleteTrip={onDeleteTrip}
              />
              <AddTripBtn onClick={toggleModal} />
            </div>
            <WeatherEveryDayList weatherEveryDay={weatherEveryDay} />
          </div>
          <div>
            <div className={styles.boxInformation}>
              <WeatherToday searchWeatherToday={searchWeatherToday} />
              <Timer startDate={startDate} />
            </div>
          </div>
          {showModal && (
            <Modal onClose={toggleModal}>
              <ModalForm onSubmit={onAddTrip} onClose={toggleModal} />
            </Modal>
          )}
        </div>
      </Container>
    </Section>
  );
}

export default WeatherForecast;
