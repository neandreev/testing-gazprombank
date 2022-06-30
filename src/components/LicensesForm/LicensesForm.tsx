import { FC, useState } from "react";
import _uniqueId from "lodash-es/uniqueId";

import LicenseElement from "../LicenseElement/LicenseElement";
import { useSetLicenses } from "../../context";

const LicensesForm: FC = () => {
  const setLicenses = useSetLicenses()!;

  const [licensesNeeded, setLicensesNeeded] = useState(true);
  const [licensesFormsIds, setLicensesFormsIds] = useState([_uniqueId()]);

  const handleToggleLicenses = (newLicensesNeeded: boolean) => {
    setLicensesNeeded(newLicensesNeeded);
    setLicenses([]);
  };

  return (
    <div>
      <h2>
        Моя компания осуществляет деятельность, подлежащую лицензированию в
        соответствии с законодательством РФ
      </h2>
      <input
        type="checkbox"
        checked={licensesNeeded}
        onChange={() => handleToggleLicenses(!licensesNeeded)}
      />
      {licensesNeeded && (
        <div>
          {licensesFormsIds?.map((id) => {
            return <LicenseElement key={id} id={id} />;
          })}
          <button
            onClick={() =>
              setLicensesFormsIds([...licensesFormsIds, _uniqueId()])
            }
          >
            Добавить ещё одну лицензию
          </button>
        </div>
      )}
    </div>
  );
};

export default LicensesForm;
