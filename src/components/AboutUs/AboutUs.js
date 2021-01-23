import React, {Component} from "react";
import bigBrand from "../../assets/images/bigBrand.svg";
import classes from "./AboutUs.module.css";

export default class AboutUs extends Component{

  componentDidMount() {

  }

  render() {
    return (
      <div className={classes.container}>
        <img className={classes.brand} src={bigBrand} alt=""/>

        <div className={classes.text_container}>
          <div className={classes.text_light}>Developer</div>
          <div className={classes.text_dark}>Vivek Aggarwal</div>
        </div>
      </div>
    );
  }
}
