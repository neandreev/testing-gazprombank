import { FC } from "react";
import { Form as FinalForm } from "react-final-form";

import { Data } from "../../models/Data.model";

import { useLicenses, useSetData } from "../../context";

import DocumentForm from "../DocumentForm/DocumentForm";

interface Props {
  openModal: () => void;
}

const Form: FC<Props> = ({ openModal }) => {
  const licenses = useLicenses();
  const setData = useSetData()!;

  return (
    <FinalForm
      onSubmit={(values: Omit<Data, "licenses">) => {
        const data = { ...values, licenses };
        setData(data);
        openModal();
        console.log({ ...values, licenses });
      }}
      validateOnBlur={true}
      component={DocumentForm}
    />
  );
};

export default Form;
