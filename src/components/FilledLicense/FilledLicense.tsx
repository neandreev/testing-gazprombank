import { FC } from "react";
import {
  useLicenses,
  useLicense,
  useSetLicenses,
  useLicensesIds,
  useSetLicensesIds,
} from "../../context";
import { License } from "../../models/License.model";
import Button from "../Button/Button";

import styles from "./FilledLicense.module.css";

interface Props {
  id: string;
  openForm: (license: any) => void;
}

const getLicenseDates = (license: License) => {
  return `${license.issuanceDate} - ${license.issuanceDate}`;
};

const FilledLicense: FC<Props> = ({ id, openForm }) => {
  const license = useLicense(id)!;
  const licensesIds = useLicensesIds();
  const setLicensesIds = useSetLicensesIds()!;
  const licenses = useLicenses();
  const setLicenses = useSetLicenses()!;

  const handleRemoveLicense = () => {
    const newLicensesIds = licensesIds.filter((licenseId) => licenseId !== id);
    const newLicensesState = licenses.filter((license) => license.id !== id);
    setLicensesIds(newLicensesIds);
    setLicenses(newLicensesState);
  };

  return (
    <div>
      <h3 className={styles["license-header"]}>Лицензия № {license?.number}</h3>
      <div className={styles["license-data"]}>
        <span className={styles["license-data-label"]}>
          Вид и номер документа
        </span>
        <span
          className={styles["license-data-value"]}
        >{`${license?.type}, № ${license?.number}`}</span>
      </div>
      <div className={styles["license-data"]}>
        <span className={styles["license-data-label"]}>Вид деятельности</span>
        <span className={styles["license-data-value"]}>
          {license?.typeOfActivity}
        </span>
      </div>
      <div className={styles["license-data"]}>
        <span className={styles["license-data-label"]}>Кем выдан документ</span>
        <span className={styles["license-data-value"]}>{license?.issuer}</span>
      </div>
      <div className={styles["license-data"]}>
        <span className={styles["license-data-label"]}>
          Дата выдачи документа и срок действия
        </span>
        <span className={styles["license-data-value"]}>
          {!license?.isPermanent ? getLicenseDates(license) : "Бессрочно"}
        </span>
      </div>
      <Button styling="transparent" icon="edit" onClick={() => openForm(license)} text="Редактировать" />
      <Button styling="transparent" icon="remove" onClick={handleRemoveLicense} text="Удалить" />
      {/* <button
        onClick={() => {
          openForm(license);
        }}
      >
        Редактировать
      </button>
      <button onClick={handleRemoveLicense}>Удалить</button> */}
    </div>
  );
};

export default FilledLicense;
