import { FC } from "react";
import _omit from "lodash-es/omit";

import { Form } from "react-final-form";

import {
  useLicenses,
  useLicensesForms,
  useSetLicenses,
  useSetLicensesForms,
} from "../../context";
import { LicenseI } from "../../models/License.model";

import LicenseFormComponent from "../LicenseFormComponent/LicenseFormConponent";

interface Props {
  id: string;
  closeLicense: () => void;
  closeForm: () => void;
  licenseData?: LicenseI;
}

const LicenseForm: FC<Props> = ({ id, closeLicense, closeForm, licenseData }) => {
  const licenses = useLicenses();
  const setLicenses = useSetLicenses()!;
  const licensesForms = useLicensesForms();
  const setLicensesForms = useSetLicensesForms()!;

  const handleSubmit = (values: Omit<LicenseI, "id">) => {
    const licenseWithId = { id, ...values };
    const newLicense = !values.isPermanent
      ? licenseWithId
      : _omit(licenseWithId, ["issuanceDate", "expirationDate"]);
    const newLicensesForms = licensesForms.filter(
      (licenseForm) => licenseForm.id !== id
    );
    const newLicenses = [...licenses, newLicense];

    setLicensesForms(newLicensesForms);
    setLicenses(newLicenses)
    closeForm();
  };

  const required = (value: any) => (value ? undefined : "Необходимо заполнить");

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
          return validateDates(values.expirationDate!, values.issuanceDate!);
        } else {
          return {};
        }
      }}
      render={({ handleSubmit }) => {
        return (
          <LicenseFormComponent
            handleSubmit={handleSubmit}
            licenseData={licenseData}
            closeLicense={closeLicense}
            id={id}
          />
        );
      }}
    />
  );
};

export default LicenseForm;
