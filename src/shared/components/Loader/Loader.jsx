import { RotatingLines } from "react-loader-spinner";
import styles from "./Loader.module.scss";

function Loader() {
  return (
    <div className={styles.loader}>
      <RotatingLines
        strokeColor="#3f51b5"
        strokeWidth="5"
        animationDuration="1.5"
        width="96"
        visible={true}
      />
    </div>
  );
}

export default Loader;
