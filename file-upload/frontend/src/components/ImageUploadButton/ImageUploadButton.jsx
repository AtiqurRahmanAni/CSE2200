import React, { useRef } from "react";
import { CiImageOn } from "react-icons/ci";
import styles from "./ImageUploadButton.module.css";

const ImageUploadButton = ({ setFiles, multiple = false }) => {
  const inputRef = useRef(null);
  const onFileUpload = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      if (!multiple) {
        setFiles(files[0]);
      }
    } else {
      console.log("No files to upload");
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        hidden={true}
        multiple={multiple}
        accept="image/jpeg,image/png,image/jpg"
        onChange={onFileUpload}
      />
      <button
        type="button"
        className={styles.button}
        onClick={() => inputRef.current.click()}
      >
        <CiImageOn className={styles.icon} />
      </button>
    </>
  );
};

export default ImageUploadButton;
