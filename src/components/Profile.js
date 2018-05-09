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
      edit: false
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
  };

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
          <img src={this.props.user.photoURL} alt="Profile Picture" />
          <h1> Name: {this.props.user.displayName}</h1>
          <p> Credits: {this.props.user.credits} </p>
          <p> Username: {this.props.user.username} </p>
          <p> Created: {this.props.user.created} </p>
          <p> Uid: {this.props.user.uid} </p>
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
          <img src={this.props.user.photoURL} alt="Profile Picture" />
          <input type="text" placeholder="Photo URL" />{" "}
          {/* MAKE THIS V-MODEL WITH USER DATA DUDEEE */}
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Email" />
          <button className="editButton" onClick={this.toggleEdit}>
            <i className="material-icons"> save </i>
          </button>
        </div>
      );
    }
  }
}

export default Profile;
