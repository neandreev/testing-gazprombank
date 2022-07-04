import { FC } from "react";

import { ReactComponent as Logo } from "./LOGO.svg";

import styles from "./Header.module.scss";
import Profile from "../Profile/Profile";

const Header: FC = () => {
  return <div className={styles.header}>
    <Logo className={styles.logo} />
    <Profile />
  </div>;
};

export default Header;
