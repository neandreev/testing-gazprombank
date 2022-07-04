import { FC } from "react";
import { Field } from "react-final-form";

import DateInput from "../DateInput/DateInput";
import TextInput from "../TextInput/TextInput";

import styles from "./DocumentsForm.module.css";

const DocumentsForm: FC = () => {
  const required = (value: any) => (value ? undefined : "Необходимо заполнить");

  return (
    <div className={styles["documents-form"]}>
      <h2 className={styles["form-header"]}>Общая информация</h2>
      <div className={styles.field}>
        <label className={styles["field-label"]}>ИНН, ОГРН или ОГРНИП</label>
        <Field
          className={`${styles["field-input"]} ${styles["field-input-medium"]}`}
          name="identificationNumber"
          component={TextInput}
          validate={required}
        />
      </div>
      <div className={styles.field}>
        <label className={styles["field-label"]}>Фамилия, имя и отчество</label>
        <Field
          className={styles["field-input"]}
          name="fullName"
          component={TextInput}
          validate={required}
        />
      </div>
      <div className={styles.field}>
        <label className={styles["field-label"]}>Дата и место рождения</label>
        <div className={styles.fields}>
          <Field
            className={`${styles["field-input"]} ${styles["field-date"]}`}
            name="birthDate"
            component={DateInput}
            validate={required}
          />
          <Field
            className={styles["field-input"]}
            name="birthPlace"
            component={TextInput}
            validate={required}
          />
        </div>
      </div>
      <div className={styles.field}>
        <label className={styles["field-label"]}>Гражданство</label>
        <Field
          className={styles["field-input"]}
          name="citizenship"
          component={TextInput}
          validate={required}
        />
      </div>
      <div className={styles.field}>
        <label className={styles["field-label"]}>СНИЛС (при наличии)</label>
        <Field
          className={styles["field-input"]}
          name="insuranceCertificate"
          component={TextInput}
        />
      </div>
      <div className={styles.field}>
        <label className={styles["field-label"]}>
          Адрес места жительства (регистрации)
        </label>
        <Field
          className={styles["field-input"]}
          name="residentialAddress"
          component={TextInput}
          validate={required}
        />
      </div>
      <div className={styles.field}>
        <label className={styles["field-label"]}>
          Адрес места пребывания (если отличается от места жительства)
        </label>
        <Field
          className={styles["field-input"]}
          name="residenceAddress"
          component={TextInput}
        />
      </div>
    </div>
  );
};

export default DocumentsForm;
