import { FC } from "react";
import { useLicenses, useLicense, useSetLicenses } from "../../context";

interface Props {
  id: string;
  openForm: () => void;
}

const FilledLicense: FC<Props> = ({ id, openForm }) => {
  const license = useLicense(id);
  const licenses = useLicenses();
  const setLicenses = useSetLicenses()!;

  const handleRemoveLicense = () => {
    const newLicensesState = licenses.filter((license) => license.id !== id);
    setLicenses(newLicensesState);
  };

  return (
    <div>
      {JSON.stringify(license)}
      <button
        onClick={() => {
          openForm();
          // handleRemoveLicense();
        }}
      >
        Редактировать
      </button>
      <button onClick={handleRemoveLicense}>Удалить</button>
    </div>
  );
};

export default FilledLicense;
