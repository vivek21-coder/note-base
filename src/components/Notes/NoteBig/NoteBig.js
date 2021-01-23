import React, {Component} from "react";
import classes from './NoteBig.module.css';

export default class NoteBig extends Component {
  render() {

    const containerClass = [classes.container];
    if (this.props.isSelected) {
      containerClass.push(classes.selectedContainer);
    }

    return (
      <div className={containerClass.join(' ')}>

        <div className={classes.headContainer}
             style={{
               backgroundColor: this.props.data.tcolor,
             }}>

          <div className={classes.dropdown}>
            <img src={require('../../../assets/images/dots.svg')} alt="dropdown"/>
            <div className={classes.dropdownContent}>
              <div className={classes.dropdownButton}>
                <span style={{zIndex:10}}>Change Color</span>
                <input className={classes.colorInput}
                       type="color"
                       value={this.props.data.tcolor}
                       onChange={(event) => this.props.editColor(event.currentTarget.value)}
                />
              </div>
              <div className={classes.deleteButton} style={{color:'red'}}
                    onClick={this.props.delete}>Delete</div>
            </div>
          </div>

          <input value={this.props.data.title}
                 type="text"
                 className={classes.headingText}
                 onChange={(event) => this.props.editTitle(event.currentTarget.value)}/>

        </div>

        <textarea value={this.props.data.content}
                  className={classes.content}
                  style={{
                    backgroundColor: this.props.data.ccolor,
                  }}
                  onChange={(event) => this.props.editContent(event.currentTarget.value)}/>

      </div>
    )
  }
}
