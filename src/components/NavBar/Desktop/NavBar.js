import React, {Component} from 'react'
import classes from './NavBar.module.css';

import Brand from '../../../assets/images/Brand.svg';
import NavBarMobile from "../Mobile/NavBarMobile";
import {auth} from "../../../firebase";

export default class NavBar extends Component {
  render() {

    // if (this.props.width <= 660) {
    //   return <NavBarMobile width={this.props.width}/>;
    // }

    return (
      <div className={classes.Container}>
        <div className={classes.NavBar}>
          <a href="/" className={classes.Header}>
            <img className={classes.imgBrand} src={Brand} alt="Brand"/>
          </a>
          {this.props.isLoggedIn?
            (
              <div className={classes.MenuGroup}>
                <a className={classes.MenuItem} href="/profile"
                   style={{color:this.props.path==="/profile"?'#ffffff':'#BABDFF'}}>My Profile</a>
                <a className={classes.MenuItem} href="/notes"
                   style={{color:this.props.path==="/notes"?'#ffffff':'#BABDFF'}}>My Notes</a>
                <a className={classes.MenuItem} href="/aboutus"
                   style={{color:this.props.path==="/aboutus"?'#ffffff':'#BABDFF'}}>About us</a>
                <a className={classes.SignupBtn} href="" onClick={()=>auth.signOut()}>Logout</a>
              </div>
            ):
            (
              <div className={classes.MenuGroupLoggedOut}>
                <a className={classes.MenuItem} href="/aboutus"
                   style={{color:this.props.path==="/aboutus"?'#ffffff':'#BABDFF'}}>About us</a>
                <a className={classes.LoginBtn} href="/login">Log in</a>
                <a className={classes.SignupBtn} href="/signup">Sign up</a>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}
