import { FC } from "react";
import { FieldRenderProps } from "react-final-form";

import styles from "./SliderInput.module.scss";

type Props = FieldRenderProps<string, any>;

const SliderInput: FC<Props> = ({ input, meta, ...rest }) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" {...input} {...rest} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default SliderInput;
