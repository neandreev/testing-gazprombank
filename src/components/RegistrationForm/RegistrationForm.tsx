import { FC, useEffect } from "react";
import { Form, Field, useFormState } from "react-final-form";
import {
  FillingStatus,
  useFillingStatus,
  useSetFillingStatus,
} from "../../context";

import DateInput from "../DateInput/DateInput";
import TextInput from "../TextInput/TextInput";

import styles from "./RegistrationForm.module.css";

const validateFillingInfo = (
  formState: any,
  fillingStatus: FillingStatus,
  setFillingStatus: ReturnType<typeof useSetFillingStatus>
) => {
  const registrationValidationValues = fillingStatus.registration.fields;

  const isRegistrationInvalid = registrationValidationValues.some((field) => {
    return formState.errors[field] && formState.touched[field];
  });
  const isRegistrationComplete = registrationValidationValues.every((field) => {
    return !formState.errors[field] && formState.values[field];
  });

  console.log("EDITING REGISTRATION STATUS")

  if (isRegistrationComplete) {
    setFillingStatus!({
      ...fillingStatus,
      registration: { ...fillingStatus.registration, status: "complete" },
    });
  } else if (isRegistrationInvalid) {
    setFillingStatus!({
      ...fillingStatus,
      registration: { ...fillingStatus.registration, status: "error" },
    });
  } else {
    setFillingStatus!({
      ...fillingStatus,
      registration: { ...fillingStatus.registration, status: "filling" },
    });
  }
};

const RegistrationForm: FC = () => {
  const formState = useFormState();
  const { values, touched, errors } = formState;
  const fillingStatus = useFillingStatus();
  const setFillingStatus = useSetFillingStatus()!;

  // useEffect(() => {
  //   validateFillingInfo(formState, fillingStatus, setFillingStatus);
  // }, [values, touched, errors]);
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
