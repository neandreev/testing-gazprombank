import { FC } from "react";

import styles from "./Slider.module.scss";

interface Props {
  onClick: () => void;
  checked: boolean;
}

const Slider: FC<Props> = ({ onClick, checked }) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" onChange={onClick} checked={checked} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default Slider;
