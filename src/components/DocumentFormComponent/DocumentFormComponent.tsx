import { FC, useEffect } from "react";
import { useFormState } from "react-final-form";

import { Data } from "../../models/Data.model";

import { FormRenderProps } from "react-final-form";

import {
  FillingStatus,
  LicenseFormState,
  useFillingStatus,
  useLicensesForms,
  useSetFillingStatus,
} from "../../context";

import AdditionalInfoForm from "../AdditionalInfoForm/AdditionalInfoForm";
import DocumentsForm from "../DocumentsForm/DocumentsForm";
import LicensesForm from "../LicensesForm/LicensesForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Button from "../Button/Button";

import styles from "./DocumentFormComponent.module.css";

type Props = FormRenderProps<Omit<Data, "licenses">, any>;

const validateDates = (licenseForm: LicenseFormState, dates: string[]) => {
  return dates.some((date) => {
    return licenseForm.errors?.[date] && licenseForm.touched?.[date];
  });
};

const validateFillingInfo = (
  formState: any,
  fillingStatus: FillingStatus,
  setFillingStatus: ReturnType<typeof useSetFillingStatus>,
  licensesForms: ReturnType<typeof useLicensesForms>
) => {
  const infoValidationValues = fillingStatus.information.fields;
  const isRegistrationTouched = fillingStatus.registration.fields.some(
    (field) => {
      return formState.touched[field];
    }
  );

  const isLicensesTouched = licensesForms.some((licenseForm) => {
    return fillingStatus.licenses.fields.some((licenseField) => {
      return licenseForm.touched?.[licenseField];
    });
  });

  const isInfoComplete = infoValidationValues.every((field) => {
    return !formState.errors[field] && formState.values[field];
  });

  const isInfoInvalid =
    infoValidationValues.some((field) => {
      return formState.errors[field] && formState.touched[field];
    }) ||
    ((isRegistrationTouched || isLicensesTouched) && !isInfoComplete);

  const registrationValidationValues = fillingStatus.registration.fields;

  const isRegistrationInvalid =
    registrationValidationValues.some((field) => {
      return formState.errors[field] && formState.touched[field];
    }) ||
    (isLicensesTouched && !isInfoComplete);
  const isRegistrationComplete = registrationValidationValues.every((field) => {
    return !formState.errors[field] && formState.values[field];
  });

  const isPollComplete =
    fillingStatus.registration.status === "complete" &&
    fillingStatus.information.status === "complete";

  const isLicensesInvalid = licensesForms.some((licenseForm) => {
    const licenseFields = fillingStatus.licenses.fields;
    const { isPermanent } = licenseForm.values;
    const isDateInvalid = !isPermanent
      ? validateDates(licenseForm, ["issuanceDate", "expirationDate"])
      : false;

    return (
      licenseFields.some((licenseField) => {
        const error = licenseForm.errors?.[licenseField];
        const touched = licenseForm.touched?.[licenseField];
        return error && touched;
      }) || isDateInvalid
    );
  });

  const infoStatus = isInfoComplete
    ? "complete"
    : isInfoInvalid
    ? "error"
    : "filling";
  const registrationStatus = isRegistrationComplete
    ? "complete"
    : isRegistrationInvalid
    ? "error"
    : "filling";
  const licensesStatus = isLicensesInvalid
    ? "error"
    : licensesForms.length === 0
    ? "complete"
    : "filling";
  const pollStatus = isPollComplete ? "complete" : "filling";

  setFillingStatus!({
    ...fillingStatus,
    information: { ...fillingStatus.information, status: infoStatus },
    registration: { ...fillingStatus.registration, status: registrationStatus },
    licenses: { ...fillingStatus.licenses, status: licensesStatus },
    poll: { ...fillingStatus.poll, status: pollStatus },
  });
};

const DocumentFormComponent: FC<Props> = ({ handleSubmit }) => {
  const formState = useFormState();
  const { values, errors, touched } = formState;
  const licensesForms = useLicensesForms();
  const fillingStatus = useFillingStatus();
  const setFillingStatus = useSetFillingStatus()!;

  useEffect(() => {
    validateFillingInfo(
      formState,
      fillingStatus,
      setFillingStatus,
      licensesForms
    );
  }, [values, errors, touched, licensesForms]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
      <DocumentsForm />
      <RegistrationForm />
      <LicensesForm />
      <AdditionalInfoForm />
      <Button
        styling="primary"
        onClick={handleSubmit}
        text="Перейти к формированию документов"
      />
    </form>
  );
};

export default DocumentFormComponent;
