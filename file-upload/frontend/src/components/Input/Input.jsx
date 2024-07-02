import React from "react";
import styles from "./Input.module.css";
import { useField } from "formik";

const Input = ({ label, isTextArea = false, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className={styles.input_wrapper}>
      <label htmlFor="price" className={styles.label}>
        {label}
      </label>
      {!isTextArea ? (
        <input className={styles.input} {...field} {...props} />
      ) : (
        <textarea className={styles.textarea} rows={4} {...field} {...props} />
      )}
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Input;
