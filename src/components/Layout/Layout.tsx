import { FC } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

import styles from "./Layout.module.css";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => (
  <div className={styles.layout}>
    <Header />
    <div className={styles.layout__content}>
      <Sidebar />
      {children}
    </div>
  </div>
);

export default Layout;
