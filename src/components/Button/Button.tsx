import { FC } from "react";

import { ReactComponent as ButtonPlus } from "./button-plus.svg";
import { ReactComponent as ButtonRemove } from "./button-remove.svg";
import { ReactComponent as ButtonEdit } from "./button-edit.svg";

import styles from "./Button.module.css";

const EditIcon = (
  <div className={styles["icon-background"]}>
    <ButtonEdit className={styles.icon} />
  </div>
);

const RemoveIcon = (
  <div className={styles["icon-background"]}>
    <ButtonRemove className={styles.icon} />
  </div>
);

const AddIcon = <ButtonPlus className={styles.icon} />;

const getIcon = (icon: string) =>
  ({
    edit: EditIcon,
    remove: RemoveIcon,
    add: AddIcon,
  }[icon]);

const getIconStyle = (icon: string) =>
  ({
    edit: styles["button-edit-remove-icon"],
    remove: styles["button-edit-remove-icon"],
    add: styles["button-add-icon"],
  }[icon]);

interface Props {
  text: string;
  icon?: "add" | "remove" | "edit";
  styling: "primary" | "secondary" | "transparent";
  onClick: () => void;
}

const getButtonStyles = (icon: Props["icon"], styling: Props["styling"]) => {
  const iconStyles = icon ? getIconStyle(icon) : null;
  const buttonStyles = [styles.button, styles[`button-${styling}`], iconStyles];

  return buttonStyles.join(" ");
};

const Button: FC<Props> = ({ text, icon, styling, onClick }) => {
  const buttonStyles = getButtonStyles(icon, styling);

  return (
    <button className={buttonStyles} onClick={onClick}>
      {icon ? (
        <span className={styles.span}>
          <div className={styles["icon-container"]}>{getIcon(icon)}</div>
          {text}
        </span>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
