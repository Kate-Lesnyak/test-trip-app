import styles from "./button.module.scss";

function Button({ type = "button", onClick, text, children }) {
  return (
    <button className={styles.btn} type={type} onClick={onClick}>
      {text}
      {children}
    </button>
  );
}

export default Button;
