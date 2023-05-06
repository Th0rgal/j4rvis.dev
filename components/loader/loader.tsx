import React from "react";
import styles from "./Loader.module.css";

interface LoaderProps {
  showLoader: boolean;
}

const Loader: React.FC<LoaderProps> = ({ showLoader }) => {
  return (
    <div
      className={`${styles.loaderWrapper} ${showLoader ? styles.show : null}`}
    >
      <div className={styles.loader}>Jarvis is typing...</div>
    </div>
  );
};

export default Loader;
