import { FC } from "react";

import { ReactComponent as Logo } from "./LOGO.svg";

import styles from "./Header.module.css";
import Authentication from "../Authentication/Authentication";

const Header: FC = () => {
  return <div className={styles.header}>
    <Logo />
    <Authentication />
  </div>;
};

export default Header;
