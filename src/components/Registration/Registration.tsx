import { FC } from "react";
import { Field } from "react-final-form";

import { required } from "../../utils/validation";

import DateInput from "../DateInput/DateInput";
import TextInput from "../TextInput/TextInput";

import styles from "./Registration.module.scss";

const Registration: FC = () => (
  <div className={styles["registration-form"]}>
    <h2 className={styles["form-header"]}>
      Сведения о регистрации в качестве индивидуального предпринимателя
    </h2>
    <div className={styles.field}>
      <label className={styles["field-label"]}>Дата и номер</label>
      <div className={styles.fields}>
        <Field
          name="registrationDate"
          component={DateInput}
          validate={required}
          className={`${styles["field-input"]} ${styles["field-date"]}`}
        />
        <Field
          name="registrationNumber"
          component={TextInput}
          validate={required}
          className={styles["field-input"]}
        />
      </div>
    </div>
    <div className={styles.field}>
      <label className={styles["field-label"]}>Место регистрации</label>
      <Field
        name="registrationPlace"
        component={TextInput}
        validate={required}
        className={styles["field-input"]}
      />
    </div>
  </div>
);

export default Registration;
