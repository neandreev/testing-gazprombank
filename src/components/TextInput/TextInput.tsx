import { FC } from "react";
import { FieldRenderProps } from "react-final-form";

import styles from "./TextInput.module.css";

type Props = FieldRenderProps<string, any>;

const TextInput: FC<Props> = ({ input, meta, className, ...rest }) => {
  const showError = meta.error && meta.touched;
  const styleError = showError ? { borderColor: "red" } : undefined;

  return (
    <span className={styles["text-input"]}>
      <input
        type="text"
        autoComplete="off"
        className={`${className} ${styles.input}`}
        {...input}
        {...rest}
        style={styleError}
      />
      {meta.error && meta.touched && (
        <span className={styles.error}>{meta.error}</span>
      )}
    </span>
  );
};

export default TextInput;
