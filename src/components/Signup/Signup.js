import React, {Component} from 'react'
import classes from './Signup.module.css';
import SignupForm from "./Parts/SignupForm/SignupForm";
import AltMethods from "../common/AltMethods/AltMethods";
import {auth} from "../../firebase";
import SignupMobile from "./Mobile/SignupMobile";
import {generateUserDocument} from "../common/generateUserDocument/generateUserDocument";

export default class Signup extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
    nameError: false,
    emailError: false,
    passwordError: false,
    confirmError: false,
  }

  changeName(val) {
    this.setState({name: val})
    // console.log(val);
  }

  changeEmail(val) {
    this.setState({email: val})
    // console.log(val);
  }

  changePassword(val) {
    this.setState({password: val})
    // console.log(val);
  }

  changeConfirm(val) {
    this.setState({confirm: val})
    // console.log(val);
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  signupHandler = () => {

    let flag = false;
    const newState = {...this.state};
    if (this.state.name.length === 0) {
      newState.nameError = true;
      flag = true;
    } else {
      newState.nameError = false;
    }
    if (!this.validateEmail(this.state.email)) {
      newState.emailError = true;
      flag = true;
    } else {
      newState.emailError = false;
    }
    if (this.state.password !== this.state.confirm || this.state.password.length < 8) {
      newState.passwordError = true;
      newState.confirmError = true;
      flag = true;
    } else {
      newState.passwordError = false;
      newState.confirmError = false;
    }

    if (flag) {
      this.setState(newState);
      return;
    }

    auth.createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
      // Handle Errors here.
      // console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorCode, errorMessage);

      if (errorCode === 'auth/email-already-in-use') {
        alert("Account already exist. Login instead.");
      }

      // ...
    }).then(r => {
      // console.log('response with money ', r.user);

      generateUserDocument({
        ...r.user, displayName: this.state.name,
        photoURL: 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/02/dummy-profile-pic-300x300-1.png',
      })
        .then(() => {
          try {
            auth.currentUser.sendEmailVerification().then(() => {
              alert("Email verification link has been sent to the specified email id.\n" +
                "Please check your inbox to enter notebase");
              auth.signOut().then(r => {
                // console.log(r, 'signed out successfully');
              });
            })
          } catch (e) {
            // console.log(e);
          }
        });

    });
  }

  render() {

    if (this.props.width <= 620) {
      return <SignupMobile/>;
    }

    return (
      <div className={classes.Container}>
        <div className={classes.Heading}>Sign up</div>

        <div className={classes.formContainer}>
          <SignupForm value={this.state}
                      change={{
                        name: (value) => this.changeName(value),
                        email: (value) => this.changeEmail(value),
                        password: (value) => this.changePassword(value),
                        confirm: (value) => this.changeConfirm(value),
                      }}
                      submit={this.signupHandler}/>
          <div className={classes.line}/>
          <AltMethods type='signup'/>
        </div>

      </div>
    )
  }
}
