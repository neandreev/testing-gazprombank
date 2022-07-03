import { FC, useCallback, useState } from "react";
import _uniqBy from "lodash-es/uniqBy";
import _omit from "lodash-es/omit";

import { Form, Field } from "react-final-form";

import { useLicenses, useSetLicenses } from "../../context";
import { License } from "../../models/License.model";

import DateInput from "../DateInput/DateInput";
import TextInput from "../TextInput/TextInput";
import Button from "../Button/Button";

import styles from "./LicenseForm.module.css";
import LicenseFormComponent from "../LicenseFormComponent/LicenseFormConponent";

interface Props {
  id: string;
  closeForm: () => void;
  changeForm: () => void;
  licenseData?: License;
}

const LicenseForm: FC<Props> = ({ id, closeForm, changeForm, licenseData }) => {
  const licenses = useLicenses();
  const setLicenses = useSetLicenses()!;
  const [togglePermanent, setTogglePermanent] = useState(
    licenseData?.isPermanent ? true : false
  );

  const handleSubmit = (values: any) => {
    const newLicense = !values.isPermanent
      ? { id, ...values }
      : _omit({ id, ...values }, ["issuanceDate", "expirationDate"]);

    setLicenses(_uniqBy([...licenses, newLicense], "id"));
    changeForm();
  };

  const required = (value: any) => (value ? undefined : "Необходимо заполнить");
  const dateRequired = useCallback(
    (value: any) => {
      return togglePermanent ? undefined : required(value);
    },
    [togglePermanent]
  );

  const validateDates = (expirationDate: string, issuanceDate: string) => {
    return {
      expirationDate: required(expirationDate),
      issuanceDate: required(issuanceDate),
    };
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={licenseData}
      validate={(values) => {
        if (!values.isPermanent) {
          return validateDates(values.expirationDate, values.issuanceDate);
        } else {
          return {};
        }
      }}
      // component={LicenseFormComponent}
      render={({ handleSubmit }) => {
        return (
          <LicenseFormComponent
            handleSubmit={handleSubmit}
            licenseData={licenseData}
            closeForm={closeForm}
          />
        );
      }}
      // render={({ handleSubmit }) => {
      // return (
      //   <div onSubmit={handleSubmit}>
      //     <h3 className={styles["form-header"]}>
      //       {licenseData ? "Редактировать лицензию" : "Добавить новую"}
      //     </h3>
      //     <div className={styles.field}>
      //       <label className={styles["field-label"]}>
      //         Вид и номер документа
      //       </label>
      //       <div className={styles.fields}>
      //         <Field
      //           className={`${styles["field-input"]} ${styles["field-input-small"]}`}
      //           name="type"
      //           component={TextInput}
      //           validate={required}
      //         />
      //         <Field
      //           className={`${styles["field-input"]} ${styles["field-input-small"]}`}
      //           name="number"
      //           component={TextInput}
      //           validate={required}
      //         />
      //       </div>
      //     </div>
      //     <div className={styles.field}>
      //       <label className={styles["field-label"]}>Вид деятельности</label>
      //       <Field
      //         className={styles["field-input"]}
      //         name="typeOfActivity"
      //         component={TextInput}
      //         validate={required}
      //       />
      //     </div>
      //     <div className={styles.field}>
      //       <label className={styles["field-label"]}>
      //         Кем выдан документ
      //       </label>
      //       <Field
      //         className={styles["field-input"]}
      //         name="issuer"
      //         component={TextInput}
      //         validate={required}
      //       />
      //     </div>
      //     <div className={styles.field}>
      //       <label className={styles["field-label"]}>
      //         Дата выдачи документа и срок действия
      //       </label>
      //       <div className={styles.fields}>
      //         <div className={styles["dates"]}>
      //           <div className={styles["dates-fields"]}>
      //             <Field
      //               className={`${styles["field-input"]} ${styles["field-date"]}`}
      //               name="issuanceDate"
      //               component={DateInput}
      //               disabled={togglePermanent}
      //               validate={(v) => dateRequired(v)}
      //             />
      //             <Field
      //               className={`${styles["field-input"]} ${styles["field-date"]}`}
      //               name="expirationDate"
      //               component={DateInput}
      //               disabled={togglePermanent}
      //               validate={(v) => dateRequired(v)}
      //             />
      //           </div>
      //           <div className={styles.permanent}>
      //             <Field
      //               name="isPermanent"
      //               type="checkbox"
      //               render={(props) => {
      //                 return (
      //                   <input
      //                     className={styles["permanent-input"]}
      //                     {...props.input}
      //                     onChange={(e) => {
      //                       props.input.onChange(e);
      //                       setTogglePermanent(!togglePermanent);
      //                     }}
      //                   />
      //                 );
      //               }}
      //             />
      //             <span className={styles["permanent-label"]}>Бессрочно</span>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //     <Button
      //       onClick={handleSubmit}
      //       text="Добавить"
      //       styling="primary"
      //       icon={false}
      //     />
      //     <Button
      //       onClick={() => closeForm()}
      //       text="Отменить"
      //       styling="secondary"
      //       icon={false}
      //     />
      //   </div>
      // );
      // }}
    />
  );
};

export default LicenseForm;
