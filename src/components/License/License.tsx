import { FC, useState } from "react";
import { useLicenses, useLicensesIds, useSetLicenses, useSetLicensesIds } from "../../context";
import { LicenseI } from "../../models/License.model";
import FilledLicense from "../FilledLicense/FilledLicense";
import LicenseForm from "../LicenseForm/LicenseForm";

import styles from "./License.module.scss";

interface Props {
  id: string;
}

const License: FC<Props> = ({ id }) => {
  const licenses = useLicenses();
  const setLicenses = useSetLicenses()!;
  const licensesIds = useLicensesIds();
  const setLicensesIds = useSetLicensesIds()!;
  const [isForm, setIsForm] = useState(true);

  const [licenseData, setLicenseData] = useState<LicenseI | undefined>(undefined);

  const handleCloseLicense = () => {
    const newLicencesIds = licensesIds.filter((licenseId) => id !== licenseId);
    setLicensesIds(newLicencesIds);
    setIsForm(false);
  };

  const handleOpenForm = (license: LicenseI) => {
    setLicenseData(license);
    const newLicenses = licenses.filter((license) => id !== license.id)
    setLicenses(newLicenses);
    setIsForm(true)
  };

  return (
    <div className={styles["license"]}>
      {isForm ? (
        <LicenseForm
          id={id}
          licenseData={licenseData}
          closeLicense={handleCloseLicense}
          closeForm={() => setIsForm(false)}
        />
      ) : (
        <FilledLicense id={id} openForm={handleOpenForm} />
      )}
    </div>
  );
};

export default License;
