import { FC } from "react";

import { ReactComponent as HomeIcon } from "./Home.svg";

import styles from "./Sidebar.module.css";

const routes = [{ id: "1", icon: HomeIcon, text: "Главная", href: "/" }];

const Sidebar: FC = () => {
  return (
    <div className={styles.sidebar}>
      <ul className={styles["links-list"]}>
        {routes.map((route) => (
          <li key={route.id} className={styles["link-list"]}>
            <a className={styles.link} href={route.href}>
              <route.icon className={styles["link-icon"]} />
              <span className={styles["link-text"]}>{route.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
