import fs from "fs";

export const deleteFiles = (files) => {
  files.forEach((element) => {
    fs.unlink(element, (err) => {
      if (err) {
        console.error("Failed to delete temporary ProductCardImage file:", err);
      }
    });
  });
};
