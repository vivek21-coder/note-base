import React, {Component} from "react";
import {auth, firestore} from '../../firebase';
import NoteSmall from "./NoteSmall/NoteSmall";
import NoteBig from "./NoteBig/NoteBig";
import classes from './Notes.module.css';
import {generateNoteDocument} from "../common/generateUserDocument/generateNoteDocument";

export default class Notes extends Component {

  state = {
    data: [],
    curr: null,
  }

  refreshHandler = () => {
    const user = auth.currentUser;
    // console.log("fetch started");
    if (user != null) {
      firestore.collection('users').doc(user.uid).collection('notes')
        .orderBy('createdAt', 'desc').get()
        .then(response => {
          const fetchedNotes = [];
          response.forEach(document => {
            const fetchedNote = {
              ...document.data(),
              _id: document.id,
            };
            fetchedNotes.push(fetchedNote);
          });
          this.setState({
            data: fetchedNotes,
            curr: fetchedNotes.length === 0 ? null : this.state.curr
          });
          this.updateTimeout = fetchedNotes.map(() => null);
        }).catch(er => {
        // console.log(er);
      })
    }
  }

  componentDidMount() {
    this.refreshHandler();
  }

  updateNoteCloudHandler = (i) => {
    if (this.updateTimeout[i] !== null) {
      clearTimeout(this.updateTimeout[i]);
    }
    this.updateTimeout[i] = setTimeout(() => {
      const user = auth.currentUser;
      firestore.collection('users').doc(user.uid).collection('notes').doc(this.state.data[i]._id).update({
        ...this.state.data[i],
      });
    }, 300);

  }

  deleteNoteCloudHandler = (id) => {
    const user = auth.currentUser;
    firestore.collection('users').doc(user.uid).collection('notes').doc(id).delete().then(() => {
      this.refreshHandler();
    })
  }

  changeSelected = (i) => {
    this.setState({curr: i});
  }

  editTitle = (i, val) => {
    const data = [...this.state.data];
    data[i].title = val;
    this.setState({data: data});
    this.updateNoteCloudHandler(i);
  }

  editContent = (i, val) => {
    const data = [...this.state.data];
    data[i].content = val;
    this.setState({data: data});
    this.updateNoteCloudHandler(i);
  }

  lightenColor = (val) => {
    let c1 = parseInt(val.substr(1, 2), 16),
      c2 = parseInt(val.substr(3, 2), 16),
      c3 = parseInt(val.substr(5, 2), 16);

    c1 = Math.floor((c1 + 4 * 255) / 5);
    c2 = Math.floor((c2 + 4 * 255) / 5);
    c3 = Math.floor((c3 + 4 * 255) / 5);

    return '#' + c1.toString(16) + c2.toString(16) + c3.toString(16);

  }

  editColor = (i, val) => {
    const data = [...this.state.data];
    data[i].tcolor = val;
    data[i].ccolor = this.lightenColor(val);
    this.setState({data: data});
    this.updateNoteCloudHandler(i);
  }

  deleteNote = (i) => {
    const data = [...this.state.data];
    this.deleteNoteCloudHandler(data[i]._id);
    data.splice(i, 1);
    this.setState({data: data});
  }

  createNoteHandler = () => {
    generateNoteDocument(auth.currentUser, {
      title: '',
      content: '',
      tcolor: '#1E63B8',
      ccolor: '#D8E7F8',
      createdAt: new Date().getTime()
    }).then(() => {
      this.refreshHandler();
      this.changeSelected(0);
    });
  }

  render() {
    return (
      <div className={classes.container}>
        <div>

          <div className={classes.newNote} onClick={this.createNoteHandler}>
            <img src={require('../../assets/images/newNote.svg')} alt="add New"/>
          </div>

          {this.state.data.map((ele, i) => {
            return (
              <NoteSmall key={ele._id}
                         data={ele}
                         isSelected={i === this.state.curr}
                         onClick={() => this.changeSelected(i)}/>
            )
          })}
        </div>

        {this.state.curr === null || this.state.data.length === 0 ? null :
          <NoteBig data={this.state.data[this.state.curr]}
                   editContent={(val) => this.editContent(this.state.curr, val)}
                   editTitle={(val) => this.editTitle(this.state.curr, val)}
                   editColor={(val) => this.editColor(this.state.curr, val)}
                   delete={() => this.deleteNote(this.state.curr)}/>
        }

      </div>
    )
  }
}
