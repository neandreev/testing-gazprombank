import { FC, useEffect, useState } from "react";
import _uniqueId from "lodash-es/uniqueId";

import License from "../License/License";
import {
  useLicensesIds,
  useSetLicenses,
  useSetLicensesForms,
  useSetLicensesIds,
} from "../../context";

import styles from "./Licenses.module.scss";
import Button from "../Button/Button";
import Slider from "../Slider/Slider";

const Licenses: FC = () => {
  const licensesFormsIds = useLicensesIds();
  const setLicensesFormsIds = useSetLicensesIds()!;
  const setLicenses = useSetLicenses()!;
  const setLicensesForms = useSetLicensesForms()!;

  const [licensesNeeded, setLicensesNeeded] = useState(true);

  const handleToggleLicenses = (newLicensesNeeded: boolean) => {
    setLicensesForms([]);
    setLicensesNeeded(newLicensesNeeded);
    setLicensesFormsIds([_uniqueId()]);
    setLicenses([]);
  };

  useEffect(() => {
    if (licensesFormsIds.length === 0) setLicensesNeeded(false);
  }, [licensesFormsIds]);

  return (
    <div className={styles["licenses-form"]}>
      <div className={styles["licenses-toggle"]}>
        <h2 className={styles["form-header"]}>
          <div>Моя компания осуществляет деятельность, подлежащую</div>
          <div>лицензированию</div>
          <div>в соответствии с законодательством РФ</div>
        </h2>
        <Slider onClick={() => handleToggleLicenses(!licensesNeeded)} checked={licensesNeeded} />
      </div>
      {licensesNeeded && (
        <div>
          <h3 className={styles["licenses-header"]}>Ваши лицензии:</h3>
          <div className={styles.licenses}>
            {licensesFormsIds?.map((id) => {
              return <License key={id} id={id} />;
            })}
          </div>
          <Button
            onClick={() =>
              setLicensesFormsIds([...licensesFormsIds, _uniqueId()])
            }
            text="Добавить ещё одну лицензию"
            styling="secondary"
            icon='add'
          />
        </div>
      )}
    </div>
  );
};

export default Licenses;
