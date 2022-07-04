import { FC } from "react";
import FillingInfo from "../FillingInfo/FillingInfo";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

import styles from "./Layout.module.scss";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => (
  <div className={styles.layout}>
    <Header />
    <div className={styles.layout__flex}>
      <Sidebar />
      <div className={styles.layout__content}>{children}</div>
      <FillingInfo />
    </div>
  </div>
);

export default Layout;
