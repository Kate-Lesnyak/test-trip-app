import { IoAdd } from "react-icons/io5";
import styles from "./addTripBtn.module.scss";

function AddTripBtn({ onClick }) {
  return (
    <button className={styles.btn} type="button" onClick={onClick}>
      <IoAdd size={24} />
      Add trip
    </button>
  );
}

export default AddTripBtn;
