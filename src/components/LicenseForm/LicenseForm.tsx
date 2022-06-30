import { FC, useState } from "react";
import _uniqBy from "lodash-es/uniqBy";
import { Form, Field, useForm, useFormState } from "react-final-form";
import { useLicense, useLicenses, useSetLicenses } from "../../context";

import DateInput from "../DateInput/DateInput";
import TextInput from "../TextInput/TextInput";
import ToggleInput from "../ToggleInput/ToggleInput";

import styles from "./LicenseForm.module.css";

interface Props {
  id: string;
  closeForm: () => void;
}

const LicenseForm: FC<Props> = ({ id, closeForm }) => {
  const license = useLicense(id);
  const licenses = useLicenses();
  const setLicenses = useSetLicenses()!;
  const [togglePermanent, setTogglePermanent] = useState(false);

  const handleSubmit = (values: any) => {
    setLicenses(_uniqBy([...licenses, { id, ...values }], 'id'));
    closeForm();
  };

  const required = (value: any) => (value ? undefined : "Required");

  return (
    <Form
      onSubmit={handleSubmit}
      // validate={validate}
      initialValues={license}
      render={({ handleSubmit }) => {
        return (
          <div onSubmit={handleSubmit}>
            <h2>Добавить новую</h2>
            <div className={styles.field}>
              <label className={styles["field-label"]}>
                Вид и номер документа
              </label>
              <div className={styles.fields}>
                <Field
                  className={styles["field-input-small"]}
                  name="type"
                  component={TextInput}
                  validate={required}
                />
                <Field
                  className={styles["field-input-small"]}
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
              <label className={styles["field-label"]}>
                Кем выдан документ
              </label>
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
                <div className={styles["dates-fields"]}>
                  <Field
                    className={styles["field-date"]}
                    name="issuanceDate"
                    component={DateInput}
                    disabled={togglePermanent}
                    validate={required}
                  />
                  <Field
                    className={styles["field-date"]}
                    name="expirationDate"
                    component={DateInput}
                    disabled={togglePermanent}
                    validate={required}
                  />
                </div>
                <Field
                  name="isPermanent"
                  type="checkbox"
                  component={(props) => (
                    <input
                      type={props.input.type}
                      name={props.input.name}
                      checked={props.input.checked}
                      onChange={(e) => {
                        props.input.onChange(e);
                        setTogglePermanent(!togglePermanent);
                      }}
                    />
                  )}
                  // component={(props) => {
                  //   return <ToggleInput {...props} />;
                  // }}
                  // component={ToggleInput}
                />
              </div>
            </div>
            <button onClick={handleSubmit}>Добавить</button>
            <button onClick={() => closeForm()}>Отменить</button>
          </div>
        );
      }}
    />
  );
};

export default LicenseForm;
