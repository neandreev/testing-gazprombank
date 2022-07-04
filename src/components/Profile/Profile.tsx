import { FC } from "react";

import { ReactComponent as LogoutIcon } from "./Logout.svg";
import { ReactComponent as ProfileIcon } from "./Profile.svg";
import { ReactComponent as NotificationsIcon } from "./Notifications.svg";

import styles from "./Profile.module.scss";

const Profile: FC = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.user}>
        <a className={styles["user-link"]} href="/">
          <ProfileIcon />
          <div>Андреев Данила</div>
        </a>
      </div>
      <div className={styles.notifications}>
        <a href="/">
          <NotificationsIcon />
        </a>
      </div>
      <div className={styles.logout}>
        <a href="/">
          <LogoutIcon />
        </a>
      </div>
    </div>
  );
};

export default Profile;
