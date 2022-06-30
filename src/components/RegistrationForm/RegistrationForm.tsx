import { FC } from "react";
import { Form, Field } from "react-final-form";

import DateInput from "../DateInput/DateInput";
import TextInput from "../TextInput/TextInput";

const RegistrationForm: FC = () => {
  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const required = (value: any) => (value ? undefined : "Это поле обязательно");

  return (
    // <Form
    //   onSubmit={handleSubmit}
    //   // validate={validate}
    //   render={({ handleSubmit }) => (
    <div>
      <h2>Сведения о регистрации в качестве индивидуального предпринимателя</h2>
      <div>
        <label>Дата и номер</label>
        <Field name="registrationDate" component={DateInput} validate={required} />
        <Field name="registrationNumber" component={TextInput} validate={required} />
      </div>
      <div>
        <label>Место регистрации</label>
        <Field name="registrationPlace" component={TextInput} validate={required}  />
      </div>
    </div>
    //   )}
    // />
  );
};

export default RegistrationForm;
