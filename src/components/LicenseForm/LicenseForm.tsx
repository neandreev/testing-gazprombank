import { FC } from "react";
import _uniqBy from "lodash-es/uniqBy";
import _omit from "lodash-es/omit";

import { Form } from "react-final-form";

import { useLicenses, useLicensesForms, useSetLicenses, useSetLicensesForms } from "../../context";
import { LicenseI } from "../../models/License.model";

import LicenseFormComponent from "../LicenseFormComponent/LicenseFormConponent";

interface Props {
  id: string;
  closeForm: () => void;
  changeForm: () => void;
  licenseData?: LicenseI;
}

const LicenseForm: FC<Props> = ({ id, closeForm, changeForm, licenseData }) => {
  const licenses = useLicenses();
  const setLicenses = useSetLicenses()!;
  const licensesForms = useLicensesForms();
  const setLicensesForms = useSetLicensesForms()!;

  const handleSubmit = (values: any) => {
    const newLicense = !values.isPermanent
      ? { id, ...values }
      : _omit({ id, ...values }, ["issuanceDate", "expirationDate"]);
    const newLicensesForms = licensesForms.filter((licenseForm) => licenseForm.id !== id);

    setLicensesForms(newLicensesForms);
    setLicenses(_uniqBy([...licenses, newLicense], "id"));
    changeForm();
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
          return validateDates(values.expirationDate, values.issuanceDate);
        } else {
          return {};
        }
      }}
      render={({ handleSubmit }) => {
        return (
          <LicenseFormComponent
            handleSubmit={handleSubmit}
            licenseData={licenseData}
            closeForm={closeForm}
            id={id}
          />
        );
      }}
    />
  );
};

export default LicenseForm;
