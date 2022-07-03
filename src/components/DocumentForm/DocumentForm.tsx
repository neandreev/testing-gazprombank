import { FC, useState } from "react";
import { Form } from "react-final-form";

import { Data } from "../../models/Data.model";

import {
  FillingStatus,
  useFillingStatus,
  useLicenses,
  useSetData,
  useSetFillingStatus,
} from "../../context";

import AdditionalInfoForm from "../AdditionalInfoForm/AdditionalInfoForm";
import DocumentsForm from "../DocumentsForm/DocumentsForm";
import LicensesForm from "../LicensesForm/LicensesForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Button from "../Button/Button";

import styles from "./DocumentForm.module.css";
import DocumentFormComponent from "../DocumentFormComponent/DocumentFormComponent";

interface Props {
  openModal: () => void;
}

const backfillData = {
  identificationNumber: "1351251234123",
  fullName: "Андреев Данила Андреевич",
  birthPlace: "г. Тюмень",
  citizenship: "Российская Федерация",
  residentialAddress: "г. Тюмень, ул. Дмитрия Менделеева, д.2",
  birthDate: "2002-06-06",
  registrationDate: "2022-06-01",
  registrationNumber: "15423523452",
  registrationPlace: "г. Тюмень",
  isPublicOfficial: true,
  isProvidingInternet: true,
  haveBeneficiaries: true,
  haveRepresentatives: true,
  haveBeneficialOwner: true,
};

// const validateFillingInfo = (
//   values: any,
//   fillingStatus: FillingStatus,
//   setFillingStatus: () => void
// ) => {
//   const infoValidationValues = fillingStatus.information.fields;
//   const isInfoInvalid = infoValidationValues.some((field) => {
    
//   });

//   return {};
// };

const DocumentForm: FC<Props> = ({ openModal }) => {
  const licenses = useLicenses();
  const setData = useSetData()!;
  const [backfill, setBackfill] = useState(false);
  const fillingStatus = useFillingStatus();
  const setFillingStatus = useSetFillingStatus();

  return (
    <Form
      onSubmit={(values: Omit<Data, "licenses">) => {
        const data = { ...values, licenses };
        setData(data);
        openModal();
        console.log({ ...values, licenses });
      }}
      initialValues={backfill && backfillData}
      // validate={(values) =>
      //   validateFillingInfo(values, fillingStatus, setFillingStatus)
      // }
      validateOnBlur={true}
      // render={({ handleSubmit }) => {
      //   return (
      //     <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
      //       {/* <button onClick={() => setBackfill(true)}>Backfill</button> */}
      //       <DocumentsForm />
      //       <RegistrationForm />
      //       <LicensesForm />
      //       <AdditionalInfoForm />
      //       <Button
      //         styling="primary"
      //         onClick={handleSubmit}
      //         text="Перейти к формированию документов"
      //       />
      //       {/* <button onClick={handleSubmit}>Отправить</button> */}
      //     </form>
      //   );
      // }}
      component={DocumentFormComponent}
    />
  );
};

export default DocumentForm;
