import { FC } from "react";
import { useFillingStatus } from "../../context";

const FillingInfo: FC = () => {
  const fillingStatus = useFillingStatus();

  return <pre>{JSON.stringify(fillingStatus, null, 2)}</pre>;
};

export default FillingInfo;
