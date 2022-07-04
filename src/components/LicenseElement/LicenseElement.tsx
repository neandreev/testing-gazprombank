import { FC, useState } from "react";
import { useLicenses, useLicensesIds, useSetLicenses, useSetLicensesIds } from "../../context";
import { License } from "../../models/License.model";
import FilledLicense from "../FilledLicense/FilledLicense";
import LicenseForm from "../LicenseForm/LicenseForm";

import styles from "./LicenseElement.module.css";

interface Props {
  id: string;
}

const LicenseElement: FC<Props> = ({ id }) => {
  const licenses = useLicenses();
  const setLicenses = useSetLicenses()!;
  const licensesIds = useLicensesIds();
  const setLicensesIds = useSetLicensesIds()!;
  const [isForm, setIsForm] = useState(true);

  const [licenseData, setLicenseData] = useState<License | undefined>(undefined);

  const handleCloseForm = () => {
    const newLicencesIds = licensesIds.filter((licenseId) => id !== licenseId);
    setLicensesIds(newLicencesIds);
    setIsForm(false);
  };

  const handleOpenForm = (license: License) => {
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
          closeForm={handleCloseForm}
          changeForm={() => setIsForm(false)}
        />
      ) : (
        <FilledLicense id={id} openForm={handleOpenForm} />
      )}
    </div>
  );
};

export default LicenseElement;
