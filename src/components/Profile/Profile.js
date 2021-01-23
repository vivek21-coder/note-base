import React, {Component} from "react";
import {auth, firestore} from "../../firebase";
import classes from './Profile.module.css';

export default class Profile extends Component {

  state={
    displayName:'',
    photoURL:'',
    email:'',
  }

  fetchProfileandler=()=>{
    const user = auth.currentUser;
    // console.log(user);
    if (user){
      firestore.collection('users').doc(user.uid).get()
        .then(res=>{
          // console.log(res.data());
          this.setState(res.data());
        }).catch(console.log);
    }
  }

  componentDidMount() {
    this.fetchProfileandler();
  }

  render() {
    return (
      <div className={classes.container}>
        <img className={classes.img} src={this.state.photoURL} alt=""/>
        <div className={classes.info_content}>
          <div className={classes.name}>{this.state.displayName}</div>
          <div className={classes.hr}/>
          <div className={classes.email}>{this.state.email}</div>
        </div>
      </div>
    )
  }
}
