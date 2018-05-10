import React, { Component } from "react";
import { database } from "../firebase";
import "./css/profile.css";

class Profile extends Component {
  /* Constructor */
  constructor(props) {
    super(props);
    console.log("Props are: ", props);

    /* Initial state of component */
    this.state = {
      edit: false,
      inputName: this.props.user.displayName,
      inputPhoto: this.props.user.photoURL,
      inputEmail: this.props.user.email
    };
  }

  toggleAdmin = () => {
    if (this.props.user.admin) {
      database.removeAdmin(this.props.user.uid);
    } else {
      database.makeAdmin(this.props.user.uid);
    }
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });


    /* SAVE CHANGES FROM STATE */
    let newUserObject = this.props.user;

    newUserObject.photoURL = this.state.inputPhoto;
    newUserObject.displayName = this.state.inputName;
    newUserObject.email = this.state.inputEmail;

    database.editUser(this.props.user.uid, newUserObject);

  };

  handleChange = (event, type) => {
    if(type === 'photoURL'){
      this.setState({inputPhoto: event.target.value});
    } else if (type === 'name'){
      this.setState({inputName: event.target.value});
    } else if (type === 'email'){
      this.setState({inputEmail: event.target.value});
    }
  }

  /* Return */
  render() {
    if (!this.props.user) {
      return (
        <div>
          <p> Loading </p>
        </div>
      );
    } else if (!this.state.edit) {
      return (
        <div className="userProfileDiv">
          <img src={this.props.user.photoURL} alt="Profile" />
          <h1> {this.props.user.displayName}</h1>
          <p> Balance: {this.props.user.credits} </p>
          <p> Username: {this.props.user.username} </p>
          <p> Email: {this.props.user.email} </p>
          <p> You are admin: {this.props.user.admin.toString()} </p>
          <button onClick={this.toggleAdmin}> Toggle Admin</button>

          <button className="editButton" onClick={this.toggleEdit}>
            <i className="material-icons"> edit </i>
          </button>
        </div>
      );
    } else {
      return (
        <div className="userProfileDiv">
          <h3> Edit profile </h3>
          <h4> Click your username in the header to change it </h4>
          <div>
            <span> Profile picture </span>
            <input type="text" onChange={ event => this.handleChange(event, 'photoURL')} value={this.state.inputPhoto} placeholder="Photo URL" />{" "}
          </div>
          <div>
            <span> Name </span>
            <input type="text" onChange={ event => this.handleChange(event, 'name')} value={this.state.inputName} placeholder="Name" />
          </div>
          <div>
            <span> Email </span>
            <input type="text" onChange={ event => this.handleChange(event, 'email')} value={this.state.inputEmail} placeholder="Email" />
          </div>
            <button className="editButton" onClick={this.toggleEdit}>
              <i className="material-icons"> save </i>
            </button>
        </div>
      );
    }
  }
}

export default Profile;
