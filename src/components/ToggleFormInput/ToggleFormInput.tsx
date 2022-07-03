import { FC } from "react";
import { FieldRenderProps } from "react-final-form";

import styles from "./ToggleFormInput.module.css";

type Props = FieldRenderProps<string, any>;

const ToggleFormInput: FC<Props> = ({ input, meta, ...rest }) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" {...input} {...rest} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default ToggleFormInput;
