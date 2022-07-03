import { FC } from "react";
import { FieldRenderProps } from "react-final-form";

import styles from "./DateInput.module.css";

type Props = FieldRenderProps<string, any>;

const DateInput: FC<Props> = ({ input, meta, className, ...rest }) => {
  const showError = meta.error && meta.touched;
  const styleError = showError ? { borderColor: "red" } : undefined;

  return (
    <span className={styles["date-input"]}>
      <input
        type="date"
        {...input}
        {...rest}
        style={styleError}
        className={`${className} ${styles.input}`}
      />
      {showError && <span className={styles.error}>{meta.error}</span>}
    </span>
  );
};

export default DateInput;
