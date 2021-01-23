import React, {Component} from 'react'
import classes from './AltMethods.module.css';

import FBsignin from '../../../assets/images/fbSignin.svg';
import Gsignin from '../../../assets/images/googleSignin.svg'
import FBsignup from '../../../assets/images/fbSignup.svg';
import Gsignup from '../../../assets/images/googleSignup.svg'
import {signInWithFacebook, signInWithGoogle} from "../../../firebase";
import {generateUserDocument} from "../generateUserDocument/generateUserDocument";

export default class AltMethods extends Component {

  gSigninHandler = () => {
    signInWithGoogle().then(r => {
        generateUserDocument(r.user).then(r => {
          // console.log(r);
        });
      }
    );
  }

  fbSigninHandler = () => {
    signInWithFacebook().then(r => {
        generateUserDocument(r.user).then(r => {
          // console.log(r);
        });
      }
    ).catch(e=>{
      // console.log('error paisa hi paisa',e);
      if (e.code==='auth/account-exists-with-different-credential'){
        alert("Facebook login not supported if you have created account using email or google.\nPlease sign in using email or google");
      }
    });
  }

  render() {
    return (
      <div className={classes.Container}>

        <img className={classes.Btn}
             src={this.props.type === 'signin' ? Gsignin : Gsignup}
             alt=""
             onClick={this.gSigninHandler}/>
        <img className={classes.Btn}
             src={this.props.type === 'signin' ? FBsignin : FBsignup}
             alt=""
             onClick={this.fbSigninHandler}/>

      </div>
    )
  }
}
