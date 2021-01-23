import React, {Component} from 'react'
import classes from './SignupMobile.module.css';
import SignupForm from "../Parts/SignupForm/SignupForm";
import AltMethods from "../../common/AltMethods/AltMethods";

export default class SignupMobile extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    confirm: '',
  }

  changeName(val) {
    this.setState({name: val})
    console.log(val);
  }

  changeEmail(val) {
    this.setState({email: val})
    console.log(val);
  }

  changePassword(val) {
    this.setState({password: val})
    console.log(val);
  }

  changeConfirm(val) {
    this.setState({confirm: val})
    console.log(val);
  }

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Heading}>Sign up</div>

        <div className={classes.formContainer}>
          <SignupForm value={{
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirm: this.state.confirm,
          }}
                      change={{
                        name: (value) => this.changeName(value),
                        email: (value) => this.changeEmail(value),
                        password: (value) => this.changePassword(value),
                        confirm: (value) => this.changeConfirm(value),
                      }}/>
          <div className={classes.line}/>
          <AltMethods type='signup'/>
        </div>

      </div>
    )
  }
}
