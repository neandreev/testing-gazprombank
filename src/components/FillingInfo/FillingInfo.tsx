import { FC } from "react";
import { useFillingStatus } from "../../context";

import styles from "./FillingInfo.module.scss";

const FillingInfo: FC = () => {
  const fillingStatus = useFillingStatus();
  const fillingStatusValues = Object.values(fillingStatus);

  return (
    <div className={styles["filling-info"]}>
      <h3 className={styles.header}>Заполнение анкеты</h3>
      <div>
        {fillingStatusValues.map((fillStatus, idx) => (
          <div key={fillStatus.name}>
            <div className={styles.status}>
              <div
                className={`${styles.icon} ${styles[fillStatus.status]}`}
              ></div>

              <span>{fillStatus.name}</span>
            </div>
            {idx !== fillingStatusValues.length - 1 ? (
              <div className={styles.stick}></div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FillingInfo;
