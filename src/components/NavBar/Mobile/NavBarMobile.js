import React, {Component} from 'react'
import classes from './NavBarMobile.module.css';
import Caret from "./Caret/Caret";
import Backdrop from "./Backdrop/Backdrop";
import Drawer from "./Drawer/Drawer";
import Brand from "../../../assets/images/Brand.svg";

export default class NavBarMobile extends Component {

  state = {
    isDrawerOpen: false
  }

  toggleDrawer = () => {
    this.setState({isDrawerOpen: !this.state.isDrawerOpen});
  }

  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.NavBar}>
          <a href="/" className={classes.Header}>
            <img className={classes.imgBrand} src={Brand} alt="Brand"/>
          </a>
          <Caret isOpen={this.state.isDrawerOpen} toggle={this.toggleDrawer}/>
          <Backdrop isOpen={this.state.isDrawerOpen} onClick={this.toggleDrawer}/>
          <Drawer width={this.props.width*0.7} isOpen={this.state.isDrawerOpen}/>
        </div>
      </div>
    )
  }
}
