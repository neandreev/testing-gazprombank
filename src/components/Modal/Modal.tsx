import { FC } from "react";
import { useData } from "../../context";

import styles from "./Modal.module.css";

const Modal: FC = () => {
  const data = useData();

  return (
    <div className={styles.centered}>
      <div className={styles.modal}>
        <pre className={styles.modalContent}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Modal;
