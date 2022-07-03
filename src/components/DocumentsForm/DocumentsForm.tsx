import { FC, useEffect } from "react";
import { Field, useFormState } from "react-final-form";
import {
  FillingStatus,
  useFillingStatus,
  useSetFillingStatus,
} from "../../context";

import DateInput from "../DateInput/DateInput";
import TextInput from "../TextInput/TextInput";

import styles from "./DocumentsForm.module.css";

const validateFillingInfo = (
  formState: any,
  fillingStatus: FillingStatus,
  setFillingStatus: ReturnType<typeof useSetFillingStatus>
) => {
  const infoValidationValues = fillingStatus.information.fields;
  const isRegistrationTouched = fillingStatus.registration.fields.some(
    (field) => {
      return formState.touched[field];
    }
  );

  const isInfoComplete = infoValidationValues.every((field) => {
    return !formState.errors[field] && formState.values[field];
    // && formState.touched[field];
  });

  console.log("EDITING DOCUMENTS STATUS")


  const isInfoInvalid = infoValidationValues.some((field) => {
    return formState.errors[field] && formState.touched[field];
  }) || (isRegistrationTouched && !isInfoComplete);

  if (isInfoComplete) {
    setFillingStatus!({
      ...fillingStatus,
      information: { ...fillingStatus.information, status: "complete" },
    });
  } else if (isInfoInvalid) {
    setFillingStatus!({
      ...fillingStatus,
      information: { ...fillingStatus.information, status: "error" },
    });
  } else {
    setFillingStatus!({
      ...fillingStatus,
      information: { ...fillingStatus.information, status: "filling" },
    });
  }

  console.log(fillingStatus);
};

const DocumentsForm: FC = () => {
  const formState = useFormState();
  const { values, errors, touched } = formState;
  const fillingStatus = useFillingStatus();
  const setFillingStatus = useSetFillingStatus()!;

  // useEffect(() => {
  //   console.log("FORM DATA", formValue.values);
  // }, [formValue])

  // const handleSubmit = (values: any) => {
  //   console.log(values);
  // };

  // useEffect(() => {
  //   validateFillingInfo(formState, fillingStatus, setFillingStatus);
  // }, [values, errors, touched]);

  const required = (value: any) => (value ? undefined : "Необходимо заполнить");

  return (
    // <Form
    //   onSubmit={handleSubmit}
    //   render={({ handleSubmit }) => (
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
            className={`${styles["field-input"]} ${styles["field-input-medium"]}`}
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
    //   )}
    // />
  );
};

export default DocumentsForm;
