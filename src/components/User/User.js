import React from "react";
import styles from "./User.module.css";
import { FaTimes } from "react-icons/fa";

const User = ({ index, user: { id, name, email }, deleteUser }) => (
  <div className={styles.user}>
    <span className={`${styles.text} ${styles.textShort}`}>
      <div className={styles.numberWrapper}>
        <span className={styles.number}>{index}</span>
      </div>
    </span>
    <span className={styles.text}>{name}</span>
    <span className={styles.text}>{email}</span>
    <button onClick={() => deleteUser(id)} className={styles.button}>
      <FaTimes />
    </button>
  </div>
);

export default User;
