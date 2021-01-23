import React, {Component} from 'react'
import classes from './LoginMobile.module.css';
import LoginForm from "../Parts/LoginForm/LoginForm";
import AltMethods from "../../common/AltMethods/AltMethods";
import {auth} from "../../../firebase";

export default class LoginMobile extends Component {

  state = {
    email: '',
    password: '',
  }

  changeEmail(val) {
    this.setState({email: val})
    // console.log(val);
  }

  changePassword(val) {
    this.setState({password: val})
    // console.log(val);
  }

  loginHandler = () => {

    let flag = false;
    const newState = {...this.state};
    if (!this.validateEmail(this.state.email)) {
      newState.emailError = true;
      flag = true;
    } else {
      newState.emailError = false;
    }
    if (this.state.password.length < 8) {
      newState.passwordError = true;
      flag = true;
    } else {
      newState.passwordError = false;
    }

    if (flag) {
      this.setState(newState);
      return;
    }

    auth.signInWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
      // Handle Errors here.
      // console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorCode, errorMessage);

      if (errorCode==='auth/wrong-password'){
        alert("Wrong Password\nor user doesn't have a password");
      }else if (errorCode==='auth/user-not-found'){
        alert("User doesn't exist\n" +
          "Please recheck the email address or signup if new to notebase");
      }

      // ...
    }).then(r => {
      // console.log(r);

      if (r != null) {
        if (auth.currentUser.emailVerified) {

        } else {
          const res = window.confirm("Email not verified. Resend email verification?");
          if (res){
            auth.currentUser.sendEmailVerification().then(()=>{
              alert("Email verification link sent");
            })
          }
          auth.signOut();
        }
      }


    });
  }

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Heading}>Login</div>

        <div className={classes.formContainer}>
          <LoginForm value={{
            email: this.state.email,
            password: this.state.password
          }}
                     change={{
                       email: (value) => this.changeEmail(value),
                       password: (value) => this.changePassword(value),
                     }}/>
          <div className={classes.line}/>
          <AltMethods type='signin'/>
        </div>

      </div>
    )
  }
}
