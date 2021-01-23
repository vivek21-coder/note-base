import React, {Component} from "react";
import classes from "./Caret.module.css"

export default class Caret extends Component {

  render() {

    let containerClass = [classes.container];

    if (this.props.isOpen) {
      containerClass.push(classes.change)
    }

    return (
      <div className={containerClass.join(" ")} onClick={this.props.toggle}>
        <div className={classes.bar1}/>
        <div className={classes.bar2}/>
        <div className={classes.bar3}/>
      </div>
    );
  }
}
