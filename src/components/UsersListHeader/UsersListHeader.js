import React from "react";
import styles from "./UsersListHeader.module.css";

const UsersListHeader = () => (
  <div className={styles.header}>
    <span className={`${styles.text} ${styles.textShort}`}>lp</span>
    <span className={styles.text}>name</span>
    <span className={styles.text}>e-mail</span>
  </div>
);

export default UsersListHeader;
