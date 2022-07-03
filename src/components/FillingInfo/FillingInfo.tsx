import { FC } from "react";
import { useFillingStatus } from "../../context";

import styles from "./FillingInfo.module.css";

const FillingInfo: FC = () => {
  const fillingStatus = useFillingStatus();
  const fillingStatusValues = Object.values(fillingStatus);

  return (
    <div>
      <h3 className={styles.header}>Заполнение анкеты</h3>
    <div>
      {fillingStatusValues.map((fillStatus, idx) => {
        const styleStatus =
          fillStatus.status === "complete"
            ? styles.complete
            : fillStatus.status === "error"
            ? styles.error
            : styles.filling;

        return (
          <div>
            <div className={styles.status}>
              <div className={`${styles.icon} ${styleStatus}`}></div>

              <span>{fillStatus.name}</span>
            </div>
            {idx !== fillingStatusValues.length - 1 ? (
              <div className={styles.stick}></div>
            ) : null}
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default FillingInfo;
