import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { Notify } from "notiflix";
import { addDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.css";

import Button from "../../../shared/components/Button";

import styles from "./modalForm.module.scss";
import stylesBtnClose from "../../../shared/components/Modal/modal.module.scss";

import cities from "../../../data/cities.json";

import initialState from "./initialState";
import { formatDateQuery } from "../../../shared/services/formatDateQuery";

function ModalForm({ onClose, onSubmit }) {
  const [state, setState] = useState({ ...initialState });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChange = ({ target }) => {
    setState((prevState) => {
      const { name, value } = target;
      console.log("prevState ModalForm===>", prevState);
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("state ModalForm до ===>", { ...state });
    onSubmit({ ...state });
    console.log("state ModalForm после ===>", { ...state });
    setState({ ...initialState });
    setStartDate(null);
    setEndDate(null);
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
  };

  const reset = () => {
    setState({ ...initialState });
    setStartDate(null);
    setEndDate(null);
  };

  const { city } = state;

  return (
    <div className={styles.container}>
      <IoCloseOutline
        className={stylesBtnClose.btnClose}
        onClick={onClose}
        size={24}
      />
      <h4 className={styles.title}>Create trip</h4>
      <form className={styles.form} onSubmit={handleSubmit}>
        <span className={styles.lineTop}></span>
        <div>
          <label className={styles.label} htmlFor="city">
            City
          </label>
          <select
            className={styles.input}
            id="city"
            name="city"
            value={city}
            onChange={handleChange}
            autoComplete="off"
            required
          >
            <option value="">Please select a city</option>
            {cities.map(({ id, city }) => (
              <option key={id} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={styles.label} htmlFor="startDate">
            Start date
          </label>
          <div className="wrap">
            <DatePicker
              className="input"
              id="startDate"
              selected={startDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => {
                setStartDate(date);
                setState((prevState) => {
                  return {
                    ...prevState,
                    start: formatDateQuery(date),
                  };
                });
              }}
              minDate={new Date()}
              maxDate={addDays(new Date(), 15)}
              calendarStartDay={1}
              placeholderText="Select date"
              autoComplete="off"
              required
            />
            <CiCalendar className="icon" size={20} />
          </div>
        </div>
        <div>
          <label className={styles.label} htmlFor="endDate">
            End date
          </label>
          <div className="wrap">
            <DatePicker
              className="input"
              id="endDate"
              selected={endDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => {
                if (!startDate) {
                  return Notify.info("Sorry, please select a start date first");
                }
                setEndDate(date);
                setState((prevState) => {
                  return {
                    ...prevState,
                    end: formatDateQuery(date),
                  };
                });
              }}
              minDate={startDate || new Date()}
              maxDate={addDays(startDate, 15)}
              calendarStartDay={1}
              placeholderText="Select date"
              autoComplete="off"
              required
            />
            <CiCalendar className="icon" size={20} />
          </div>
        </div>
        <span className={styles.lineBottom}></span>
        <div className={styles.wrapBtn}>
          <Button
            onClick={() => {
              handleCancel();
            }}
            text="Cancel"
          />
          <Button type="submit" text="Save" />
        </div>
      </form>
    </div>
  );
}

export default ModalForm;
