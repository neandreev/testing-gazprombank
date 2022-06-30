import { FC, useState } from "react";
import { Form } from "react-final-form";

import { Data } from "../../models/Data.model";

import { useLicenses, useSetData } from "../../context";

import AdditionalInfoForm from "../AdditionalInfoForm/AdditionalInfoForm";
import DocumentsForm from "../DocumentsForm/DocumentsForm";
import LicensesForm from "../LicensesForm/LicensesForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

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

const DocumentForm: FC<Props> = ({ openModal }) => {
  const licenses = useLicenses();
  const setData = useSetData()!;
  const [backfill, setBackfill] = useState(false);

  return (
    <Form
      onSubmit={(values: Omit<Data, "licenses">) => {
        const data = { ...values, licenses };
        setData(data);
        openModal();
        console.log({ ...values, licenses });
      }}
      initialValues={backfill && backfillData}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={(e) => e.preventDefault()}>
            <button onClick={() => setBackfill(true)}>Backfill</button>
            <DocumentsForm />
            <RegistrationForm />
            <LicensesForm />
            <AdditionalInfoForm />
            <button onClick={handleSubmit}>Отправить</button>
          </form>
        );
      }}
    />
  );
};

export default DocumentForm;
