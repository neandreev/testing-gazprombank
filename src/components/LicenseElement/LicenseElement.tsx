import { FC, useState } from "react";
import FilledLicense from "../FilledLicense/FilledLicense";
import LicenseForm from "../LicenseForm/LicenseForm";

interface Props {
  id: string;
}

const LicenseElement: FC<Props> = ({ id }) => {
  const [isForm, setIsForm] = useState(true);

  return (
    <>
      {isForm ? (
        <LicenseForm id={id} closeForm={() => setIsForm(false)} />
      ) : (
        <FilledLicense id={id} openForm={() => setIsForm(true)} />
      )}
    </>
  );
};

export default LicenseElement;
