import React from 'react'
import classes from './Backdrop.module.css'

export default class Backdrop extends React.Component {
  render() {

    let backdropClass;
    if (this.props.isOpen) {
      backdropClass = classes.Backdrop
    } else {
      backdropClass = classes.NoBackdrop
    }

    return (
      <div className={backdropClass} onClick={this.props.onClick}/>
    )
  }
}
