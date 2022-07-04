import { FC } from "react";

import styles from "./ToggleInput.module.scss";

interface Props {
  onClick: () => void;
  checked: boolean;
}

const ToggleInput: FC<Props> = ({ onClick, checked }) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" onChange={onClick} checked={checked} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default ToggleInput;
