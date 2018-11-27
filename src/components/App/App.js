import React, { Component } from "react";
import styles from "./App.module.css";

import UsersList from "../UsersList/UsersList";
import AddUserForm from "../AddUserForm/AddUserForm";
import UsersListHeader from "../UsersListHeader/UsersListHeader";

class App extends Component {
  state = {
    users: [],
    notification: false,
    handleSort: false
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(users =>
        this.setState({
          users
        })
      );
  }

  addUser = user => {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(user => {
        this.setState({
          users: [...this.state.users, user],
          notification: true
        });
      });
  };

  deleteUser = userId => {
    this.setState({
      users: this.state.users.filter(user => userId !== user.id),
      notification: false
    });
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.app}>
          <AddUserForm
            notification={this.state.notification}
            users={this.state.users}
            addUser={this.addUser}
          />
          <UsersListHeader />
          <UsersList users={this.state.users} deleteUser={this.deleteUser} />
        </div>
      </div>
    );
  }
}

export default App;
