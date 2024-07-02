import React from "react";
import styles from "./Button.module.css";

const Button = ({ btnText, type = "button" }) => {
  return (
    <button type={type} className={styles.button}>
      {btnText}
    </button>
  );
};

export default Button;
