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

import Poll from "../Poll/Poll";
import Information from "../Information/Information";
import Licenses from "../Licenses/Licenses";
import Registration from "../Registration/Registration";
import Button from "../Button/Button";

import styles from "./DocumentForm.module.scss";

const getFillingStatus = (isComplete: boolean, isInvalid: boolean) => {
  if (isComplete) return "complete";
  if (isInvalid) return "error";
  return "filling";
};

const isFieldValid = (formState: any, field: string) =>
  !formState.errors[field] && formState.values[field];

const isFieldInvalid = (formState: any, field: string) =>
  formState.errors[field] && formState.touched[field];

const isAnyDateInvalid = (licenseForm: LicenseFormState) => {
  return ["issuanceDate", "expirationDate"].some((date) =>
    isFieldInvalid(licenseForm, date)
  );
};

const validateFillingInfo = (
  formState: any,
  fillingStatus: FillingStatus,
  setFillingStatus: ReturnType<typeof useSetFillingStatus>,
  licensesForms: ReturnType<typeof useLicensesForms>
) => {
  const informationFields = fillingStatus.information.fields;
  const registrationFields = fillingStatus.registration.fields;
  const licenseFields = fillingStatus.licenses.fields;

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

  const isInformationValid = informationFields.every((field) =>
    isFieldValid(formState, field)
  );
  const isInformationInvalid =
    informationFields.some((field) => isFieldInvalid(formState, field)) ||
    ((isRegistrationTouched || isLicensesTouched) && !isInformationValid);

  const isRegistrationValid = registrationFields.every((field) =>
    isFieldValid(formState, field)
  );
  const isRegistrationInvalid =
    registrationFields.some((field) => isFieldInvalid(formState, field)) ||
    (isLicensesTouched && !isInformationValid);

  const isEachLicenseValid = licensesForms.length === 0;
  const isAnyLicenseInvalid = licensesForms.some((licenseForm) => {
    const { isPermanent } = licenseForm.values;
    const isDateInvalid = !isPermanent ? isAnyDateInvalid(licenseForm) : false;

    return (
      licenseFields.some((licenseField) =>
        isFieldInvalid(licenseForm, licenseField)
      ) || isDateInvalid
    );
  });

  const informationStatus = getFillingStatus(
    isInformationValid,
    isInformationInvalid
  );
  const registrationStatus = getFillingStatus(
    isRegistrationValid,
    isRegistrationInvalid
  );
  const licensesStatus = getFillingStatus(
    isEachLicenseValid,
    isAnyLicenseInvalid
  );

  const isPollValid =
    informationStatus === "complete" &&
    registrationStatus === "complete" &&
    licensesStatus === "complete";
  const pollStatus = isPollValid ? "complete" : "filling";

  setFillingStatus!({
    information: { ...fillingStatus.information, status: informationStatus },
    registration: { ...fillingStatus.registration, status: registrationStatus },
    licenses: { ...fillingStatus.licenses, status: licensesStatus },
    poll: { ...fillingStatus.poll, status: pollStatus },
  });
};

type Props = FormRenderProps<Omit<Data, "licenses">, any>;

const DocumentForm: FC<Props> = ({ handleSubmit }) => {
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
      <Information />
      <Registration />
      <Licenses />
      <Poll />
      <Button
        styling="primary"
        onClick={handleSubmit}
        text="Перейти к формированию документов"
      />
    </form>
  );
};

export default DocumentForm;
