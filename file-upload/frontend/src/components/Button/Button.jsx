import React from "react";
import styles from "./Button.module.css";

const Button = ({
  btnText,
  type = "button",
  loadingText = "",
  loading = false,
}) => {
  return (
    <button type={type} className={styles.button} disabled={loading}>
      {!loading ? btnText : loadingText}
    </button>
  );
};

export default Button;
