import { useState, useEffect } from "react";
import { calculateTime } from "../../../shared/services/calculateTime";

import styles from "./timer.module.scss";
import { addLeadingZero } from "../../../shared/services/addLeadingZero";

function Timer({ startDate }) {
  const [time, setTime] = useState(calculateTime());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(calculateTime(startDate));
    }, 1000);

    return () => clearInterval(timerId);
  }, [startDate]);

  return (
    <>
      {!isNaN(time.days) && (
        <div className={styles.timer}>
          <div className={styles.field}>
            <span className={styles.value}>{addLeadingZero(time.days)}</span>
            <span className={styles.label}>Days</span>
          </div>
          <div className={styles.field}>
            <span className={styles.value}>{addLeadingZero(time.hours)}</span>
            <span className={styles.label}>Hours</span>
          </div>
          <div className={styles.field}>
            <span className={styles.value}>{addLeadingZero(time.minutes)}</span>
            <span className={styles.label}>Minutes</span>
          </div>
          <div className={styles.field}>
            <span className={styles.value}>{addLeadingZero(time.seconds)}</span>
            <span className={styles.label}>Seconds</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Timer;
