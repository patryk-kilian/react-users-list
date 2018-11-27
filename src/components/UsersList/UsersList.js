import React from "react";
import styles from "./UsersList.module.css";

import User from "../User/User";

const UsersList = ({ users, deleteUser }) => {
  if (users.length > 0) {
    return (
      <div className={styles.list}>
        {users.map((user, index) => {
          return (
            <User
              key={index}
              index={index + 1}
              user={user}
              deleteUser={deleteUser}
            />
          );
        })}
      </div>
    );
  } else {
    return <p className={styles.text}>Users list is empty.</p>;
  }
};

export default UsersList;
