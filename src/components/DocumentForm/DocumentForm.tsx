import { FC } from "react";
import { Form } from "react-final-form";

import { Data } from "../../models/Data.model";

import { useLicenses, useSetData } from "../../context";

import DocumentFormComponent from "../DocumentFormComponent/DocumentFormComponent";

interface Props {
  openModal: () => void;
}

const DocumentForm: FC<Props> = ({ openModal }) => {
  const licenses = useLicenses();
  const setData = useSetData()!;

  return (
    <Form
      onSubmit={(values: Omit<Data, "licenses">) => {
        const data = { ...values, licenses };
        setData(data);
        openModal();
        console.log({ ...values, licenses });
      }}
      validateOnBlur={true}
      component={DocumentFormComponent}
    />
  );
};

export default DocumentForm;
