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

interface Props {
  text: string;
  icon?: "add" | "remove" | "edit";
  styling: "primary" | "secondary" | "transparent";
  onClick: () => void;
}

const getButtonClassName = (icon: Props["icon"], style: Props["styling"]) => {
  const buttonStyles = [styles.button];
  if (style === "primary") {
    buttonStyles.push(styles["button-primary"]);
  } else if (style === "secondary") {
    buttonStyles.push(styles["button-secondary"]);
  } else {
    buttonStyles.push(styles["button-transparent"]);
  }

  if (icon === 'edit' || icon === 'remove') buttonStyles.push(styles["button-edit-remove-icon"]);
  if (icon === 'add') buttonStyles.push(styles["button-add-icon"]);
  // if (icon) buttonStyles.push(styles["button-with-icon"]);
  return buttonStyles.join(" ");
};

const Button: FC<Props> = ({ text, icon, styling: style, onClick }) => {
  const buttonClassName = getButtonClassName(icon, style);

  return (
    <button className={buttonClassName} onClick={onClick}>
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
