import { FC } from "react";
import { FieldRenderProps } from "react-final-form";

import styles from "./DateInput.module.css";

type Props = FieldRenderProps<string, any>;

const TextInput: FC<Props> = ({ input, meta, ...rest }) => {
  return (
    <span className={styles['date-input']}>
      <input type="date" {...input} {...rest} />
      {meta.error && meta.touched && (
        <span className={styles.error}>{meta.error}</span>
      )}
    </span>
  );
};

export default TextInput;

