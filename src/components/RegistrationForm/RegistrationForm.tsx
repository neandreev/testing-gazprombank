import { FC } from "react";
import { Form, Field } from "react-final-form";

import DateInput from "../DateInput/DateInput";
import TextInput from "../TextInput/TextInput";

import styles from "./RegistrationForm.module.css";

const RegistrationForm: FC = () => {
  // const handleSubmit = (values: any) => {
  //   console.log(values);
  // };

  const required = (value: any) => (value ? undefined : "Необходимо заполнить");

  return (
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
            className={`${styles["field-input"]} ${styles["field-input-medium"]}`}
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
};

export default RegistrationForm;
