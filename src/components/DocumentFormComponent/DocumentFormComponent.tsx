import { FC, useCallback, useEffect, useState } from "react";
import { Form, useFormState } from "react-final-form";

import { Data } from "../../models/Data.model";

import { FormRenderProps } from "react-final-form";

import {
  FillingStatus,
  LicenseFormState,
  useFillingStatus,
  useLicenses,
  useLicensesForms,
  useSetData,
  useSetFillingStatus,
} from "../../context";

import AdditionalInfoForm from "../AdditionalInfoForm/AdditionalInfoForm";
import DocumentsForm from "../DocumentsForm/DocumentsForm";
import LicensesForm from "../LicensesForm/LicensesForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Button from "../Button/Button";

import styles from "./DocumentFormComponent.module.css";

type Props = FormRenderProps<Omit<Data, "licenses">, any>;

const required = (value: any) => (value ? undefined : "Необходимо заполнить");

const validateDates = (licenseForm: LicenseFormState, dates: string[]) => {
  // return {
  //   expirationDate: required(expirationDate),
  //   issuanceDate: required(issuanceDate),
  // };
  return dates.some((date) => {
    console.log("date error", licenseForm.errors?.[date]);
    console.log("date touched", licenseForm.touched?.[date]);
    console.log(
      "date valid",
      licenseForm.errors?.[date] && licenseForm.touched?.[date]
    );
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
    // && formState.touched[field];
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

  console.log("LICENSES FORMS", licensesForms);
  console.log("FORM VALUES", formState.values);

  const isLicensesInvalid = licensesForms.some((licenseForm) => {
    // if (Object.keys(licenseForm.values).length === 0) return false;
    console.log("LICENSE FORM VALUES", licenseForm.values);
    const licenseFields = fillingStatus.licenses.fields;
    const { isPermanent, issuanceDate, expirationDate } = licenseForm.values;
    const isDateInvalid = !isPermanent
      ? validateDates(licenseForm, ["issuanceDate", "expirationDate"])
      : false;

    console.log("IS DATE INVALID", isDateInvalid);
    return (
      licenseFields.some((licenseField) => {
        const error = licenseForm.errors?.[licenseField];
        const touched = licenseForm.touched?.[licenseField];
        return error && touched;
      }) || isDateInvalid
    );
  });

  console.log("IS LICENSE INVALID", isLicensesInvalid);

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

  // if (isInfoComplete) {
  //   setFillingStatus!({
  //     ...fillingStatus,
  //     information: { ...fillingStatus.information, status: "complete" },
  //   });
  // } else if (isInfoInvalid) {
  //   setFillingStatus!({
  //     ...fillingStatus,
  //     information: { ...fillingStatus.information, status: "error" },
  //   });
  // } else {
  //   setFillingStatus!({
  //     ...fillingStatus,
  //     information: { ...fillingStatus.information, status: "filling" },
  //   });
  // }

  setFillingStatus!({
    ...fillingStatus,
    information: { ...fillingStatus.information, status: infoStatus },
    registration: { ...fillingStatus.registration, status: registrationStatus },
    licenses: { ...fillingStatus.licenses, status: licensesStatus },
    poll: { ...fillingStatus.poll, status: pollStatus },
  });

  console.log(fillingStatus);
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
      {/* <button onClick={handleSubmit}>Отправить</button> */}
    </form>
  );
};

export default DocumentFormComponent;
