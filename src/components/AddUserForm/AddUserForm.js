import React, { Component } from "react";
import styles from "./AddUserForm.module.css";
import { FaPlusCircle, FaExclamationCircle, FaCheck } from "react-icons/fa";

class AddUserForm extends Component {
  state = {
    formVisible: false,
    name: "",
    nameError: "",
    email: "",
    emailError: ""
  };

  nameInput = React.createRef();

  componentDidUpdate() {
    if (this.nameInput.current && !this.state.name && !this.state.email) {
      this.nameInput.current.focus();
    }
  }

  handleClick = () => {
    if (this.props.users.length < 10) {
      this.setState({
        formVisible: true
      });
    }
  };

  clearForm = () => {
    this.setState({
      name: "",
      nameError: "",
      email: "",
      emailError: ""
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const error = this.validate();

    if (!error) {
      const user = {
        id: Date.now(),
        name: this.state.name,
        email: this.state.email
      };
      this.props.addUser(user);
      this.clearForm();
      this.setState({
        formVisible: false
      });
    }
  };

  validate = () => {
    let isError = false;
    const errors = {
      nameError: "",
      emailError: ""
    };
    const alphabetExp = /^[a-zA-Z\s]*$/;
    const validEmailExp = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

    if (this.state.name.length > 20 || !this.state.name.match(alphabetExp)) {
      isError = true;
      errors.nameError = "Only letters, not longer than 20 characters";
    }

    if (!this.state.name) {
      isError = true;
      errors.nameError = "Please fill this field";
    }

    if (!this.state.email.match(validEmailExp)) {
      isError = true;
      errors.emailError = "Enter a valid email.";
    }

    this.props.users.forEach(user => {
      if (user.email.toLowerCase() === this.state.email.toLowerCase()) {
        isError = true;
        errors.emailError = "This email already exist";
      }
    });

    if (isError) {
      this.setState({
        ...errors
      });
    }

    return isError;
  };

  render() {
    if (this.state.formVisible) {
      return (
        <div className={styles.box}>
          <form onSubmit={this.handleSubmit} action="" className={styles.form}>
            <div className={styles.inputWrapper}>
              <input
                className={
                  this.state.nameError ? styles.inputWarning : styles.input
                }
                type="text"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
                placeholder="Name..."
                ref={this.nameInput}
              />
              <span className={styles.errorText}>{this.state.nameError}</span>
            </div>
            <div className={styles.inputWrapper}>
              <input
                className={
                  this.state.emailError ? styles.inputWarning : styles.input
                }
                type="text"
                name="email"
                onChange={this.handleChange}
                value={this.state.email}
                placeholder="E-mail..."
              />
              <span className={styles.errorText}>{this.state.emailError}</span>
            </div>

            <button className={styles.button} type="submit">
              submit
            </button>
            {this.state.name.length > 0 || this.state.email.length > 0 ? (
              <button onClick={this.clearForm} className={styles.buttonText}>
                Reset fields
              </button>
            ) : null}
          </form>
        </div>
      );
    } else {
      return (
        <div className={styles.box}>
          <button onClick={this.handleClick} className={styles.button}>
            <FaPlusCircle className={styles.icon} /> <span>Add user</span>
          </button>
          {(() => {
            if (
              this.props.notification === true &&
              this.props.users.length < 10
            )
              return (
                <p className={styles.notification}>
                  <FaCheck className={styles.iconGreen} />
                  <span>You have successfully added an user.</span>
                </p>
              );
            if (this.props.users.length >= 10)
              return (
                <p className={styles.notification}>
                  <FaExclamationCircle className={styles.iconRed} />
                  <span>You can't add new user because of a limit.</span>
                </p>
              );
            if (this.props.users.length < 10) return null;
          })()}
        </div>
      );
    }
  }
}

export default AddUserForm;
