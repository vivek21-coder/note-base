import React from 'react'
import classes from './Drawer.module.css'

export default class Drawer extends React.Component {
  render() {

    let drawerClass;
    if (this.props.isOpen) {
      drawerClass = classes.Drawer
    } else {
      drawerClass = classes.NoDrawer
    }

    return (
      <div className={drawerClass} style={{width: this.props.width}}>
        <div className={classes.MenuGroup} style={{width: this.props.width}}>
          <a className={classes.MenuItem} href="/">Home</a>
          <a className={classes.MenuItem} href="#">Menu</a>
          <a className={classes.MenuItem} href="#">Other</a>
          <a className={classes.LoginBtn} href="/login">Log in</a>
          <a className={classes.SignupBtn} href="/signup">Sign up</a>
        </div>
      </div>
    )
  }
}
