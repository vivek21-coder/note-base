import React, {Component} from 'react'
import classes from './SignupForm.module.css';

export default class SignupForm extends Component {

  textbox = [classes.TextBox].join(' ');
  textboxError = [classes.TextBox, classes.Error].join(' ');

  render() {
    return (
      <div className={classes.Container}>

        <div className={classes.TextBoxContainer}>
          <div>
            <div className={classes.Label}>Full Name</div>
            <input className={(this.props.value.nameError) ? this.textboxError : this.textbox}
                   value={this.props.value.name}
                   onChange={(event) => this.props.change.name(event.currentTarget.value)}
                   type="text"
                   placeholder="Satya Nadella"/>
          </div>
          <div>
            <div className={classes.Label}>Email</div>
            <input className={(this.props.value.emailError) ? this.textboxError : this.textbox}
                   value={this.props.value.email}
                   onChange={(event) => this.props.change.email(event.currentTarget.value)}
                   type="email"
                   placeholder="abc@xyz.com"/>
          </div>
          <div>
            <div className={classes.Label}>Password</div>
            <input className={(this.props.value.passwordError) ? this.textboxError : this.textbox}
                   value={this.props.value.password}
                   onChange={(event) => this.props.change.password(event.currentTarget.value)}
                   type="password"
                   placeholder={'\u2022\u2022\u2022\u2022\u2022' +
                   '\u2022\u2022\u2022\u2022\u2022' +
                   '\u2022\u2022\u2022\u2022\u2022' +
                   '\u2022\u2022\u2022\u2022\u2022'}/>
          </div>
          <div>
            <div className={classes.Label}>Confirm Password</div>
            <input className={(this.props.value.confirmError) ? this.textboxError : this.textbox}
                   value={this.props.value.confirm}
                   onChange={(event) => this.props.change.confirm(event.currentTarget.value)}
                   type="password"
                   placeholder={'\u2022\u2022\u2022\u2022\u2022' +
                   '\u2022\u2022\u2022\u2022\u2022' +
                   '\u2022\u2022\u2022\u2022\u2022' +
                   '\u2022\u2022\u2022\u2022\u2022'}/>
          </div>
        </div>

        <button className={classes.LoginBtn} onClick={this.props.submit}>Register</button>

      </div>
    )
  }
}
