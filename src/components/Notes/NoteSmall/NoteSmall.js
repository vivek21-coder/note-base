import React, {Component} from "react";
import classes from './NoteSmall.module.css';

export default class Notes extends Component {
  render() {

    const containerClass=[classes.container];
    if (this.props.isSelected){
      containerClass.push(classes.selectedContainer);
    }

    return (
      <div className={containerClass.join(' ')} onClick={this.props.onClick}>
        <div className={classes.headContainer}
             style={{
               backgroundColor: this.props.data.tcolor,
             }}>
          <div className={classes.headingText}>{this.props.data.title}</div>
        </div>
        <div className={classes.content}
             style={{
               backgroundColor: this.props.data.ccolor,
             }}>{this.props.data.content}</div>
      </div>
    )
  }
}
