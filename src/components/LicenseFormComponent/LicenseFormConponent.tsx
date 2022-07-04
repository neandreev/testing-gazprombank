import { FC, useEffect, useState } from "react";
import { Field, useFormState } from "react-final-form";
import { useLicensesForms, useSetLicensesForms } from "../../context";

import { License } from "../../models/License.model";

import Button from "../Button/Button";
import DateInput from "../DateInput/DateInput";
import TextInput from "../TextInput/TextInput";

import styles from "./LicenseFormComponent.module.css";

interface Props {
  handleSubmit: () => void;
  closeForm: () => void;
  licenseData?: License;
  id: string;
}

const LicenseFormComponent: FC<Props> = ({
  handleSubmit,
  licenseData,
  closeForm,
  id
}) => {
  const formData = useFormState();
  const { values, touched, errors } = formData;
  const licensesForms = useLicensesForms();
  const setLicensesForms = useSetLicensesForms()!;
  const [togglePermanent, setTogglePermanent] = useState(
    licenseData?.isPermanent ? true : false
  );

  useEffect(() => {
    const filteredLicenses = licensesForms.filter((formData) => formData.id !== id);
    const newLicensesForms = [...filteredLicenses, { ...formData, id }];
    setLicensesForms(newLicensesForms)
  }, [values, touched, errors]);

  const required = (value: any) => (value ? undefined : "Необходимо заполнить");

  return (
    <div onSubmit={handleSubmit}>
      <h3 className={styles["form-header"]}>
        {licenseData ? "Редактировать лицензию" : "Добавить новую"}
      </h3>
      <div className={styles.field}>
        <label className={styles["field-label"]}>Вид и номер документа</label>
        <div className={styles.fields}>
          <Field
            className={styles["field-input"]}
            name="type"
            component={TextInput}
            validate={required}
          />
          <Field
            className={styles["field-input"]}
            name="number"
            component={TextInput}
            validate={required}
          />
        </div>
      </div>
      <div className={styles.field}>
        <label className={styles["field-label"]}>Вид деятельности</label>
        <Field
          className={styles["field-input"]}
          name="typeOfActivity"
          component={TextInput}
          validate={required}
        />
      </div>
      <div className={styles.field}>
        <label className={styles["field-label"]}>Кем выдан документ</label>
        <Field
          className={styles["field-input"]}
          name="issuer"
          component={TextInput}
          validate={required}
        />
      </div>
      <div className={styles.field}>
        <label className={styles["field-label"]}>
          Дата выдачи документа и срок действия
        </label>
        <div className={styles.fields}>
          <div className={styles["dates"]}>
            <div className={styles["dates-fields"]}>
              <Field
                className={`${styles["field-input"]} ${styles["field-date"]}`}
                name="issuanceDate"
                component={DateInput}
                disabled={togglePermanent}
              />
              <Field
                className={`${styles["field-input"]} ${styles["field-date"]}`}
                name="expirationDate"
                component={DateInput}
                disabled={togglePermanent}
              />
            </div>
            <div className={styles.permanent}>
              <Field
                name="isPermanent"
                type="checkbox"
                render={(props) => {
                  return (
                    <input
                      className={styles["permanent-input"]}
                      {...props.input}
                      onChange={(e) => {
                        props.input.onChange(e);
                        setTogglePermanent(!togglePermanent);
                      }}
                    />
                  );
                }}
              />
              <span className={styles["permanent-label"]}>Бессрочно</span>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={handleSubmit}
        text="Добавить"
        styling="primary"
      />
      <Button
        onClick={() => closeForm()}
        text="Отменить"
        styling="secondary"
      />
    </div>
  );
};

export default LicenseFormComponent;
