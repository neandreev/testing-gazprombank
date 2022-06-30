import { FC } from "react";
import { FieldRenderProps } from "react-final-form";

import styles from "./ToggleInput.module.css";

type Props = FieldRenderProps<string, any>;

const ToggleInput: FC<Props> = ({ input, meta, ...rest }) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" {...input} {...rest} />
      <span className={`${styles.slider} ${styles.round}`}></span>
      {meta.error && meta.touched && <span>{meta.error}</span>}
    </label>
  );
};

export default ToggleInput;
