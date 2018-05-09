import React, { Component } from 'react';
import { database } from '../firebase';
import './css/createuser.css';

class CreateUser extends Component {
    /* Constructor */
    constructor(props) {
        super(props);
        console.log('Props are: ', props);

        /* Initial state of component */
        this.state = {
          username: '',
          editName: false
        };

    }

    handleChange = event => {
      this.setState({username: event.target.value});
    }

    handleClick = event => {
      let edit = false;
      let username = this.state.username;
      let propUser = this.props.user;
      let prevState = this;
      console.log('Propuser is: ', propUser);
      console.log('Username is: ', username);

      /* Just changing username? */
      if(event.target.innerText.includes('Change')){
        edit = true;

        /* Check credits */
        if(propUser.credits){
          if(propUser.credits > 2000){
            console.log('Name changed!');
            database.takeCredits(propUser.uid, 2000);
          } else {
            console.log('You cannot afford this, sorry');
            return false;
          }
        } else {
          /* No credits ? */
          console.log('You have no credits!');
          database.setCredits(propUser.uid, 0);
          return false;
        }

      }

      /* Check username */
      database.retrieveAllUsers()
      .then(function (res){
        let taken = false;
        let data = res.val();
        for(let user in data){
          /* Check if the user has a username */
          if(data[user].username){
            if(username.toLowerCase() === data[user].username.toLowerCase()){
              taken = true;
            }
          }
        }
        if(taken){
          console.log('Name already taken');
        } else {

          /* Create user */

          if(prevState.controlName(username)){
            let userObject = {
              uid: propUser.uid,
              displayName: propUser.displayName,
              email: propUser.email,
              photoURL: propUser.photoURL,
              created: new Date().getTime(),
              username: username,
              admin: false,
              credits: propUser.credits ? propUser.credits : 0
            }
            database.createUser(userObject);
            prevState.props.setUser(userObject);

            if(edit){
              console.log('Close');
              prevState.props.toggleChangeUsername();
            }

          } else {
            console.log('This username does not fulfill the requirements.');
          }
        }
        console.log('Result is: ', data);
      }).catch(function (err){
        console.log('error is:', err);
      })

    }

    controlName(username){
      username = username.toLowerCase();
      if(typeof username !== 'string'){
        return false;
      } else if(username.length < 3){
        return false;
      } else if(username.length > 18){
        return false;
      } else if(username.includes(' ')){
        return false;
      }
      return true;
    }

    /* Return */
    render() {
      /* Check if there's a user logged in */
      if(this.props.user && !this.props.doRender){
        /* Check if this user has a username */
        if(!this.props.user.username){
          return (
            <div className="createUserDiv">
              <h1>Welcome to</h1>
              <h1>Quiz App</h1>
              <h4>Choose a username to get started </h4>
              <input onChange={this.handleChange} value={this.state.username}type="text" placeholder="Username.."/>
              <br />
              <button onClick={this.handleClick}> Start playing! </button>
            </div>
          )
        }
      } else if(this.props.doRender){
        return (
          <div className="createUserDiv">
            <h1>Quiz App</h1>
            <h4>Change your username</h4>
            <h5>Cost: 2000 credits</h5>
            <input onChange={this.handleChange} value={this.state.username}type="text" placeholder="Username.."/>
            <br />
            <button onClick={this.handleClick}> Change username </button>
            <button onClick={this.props.toggleChangeUsername}> Close </button>
          </div>
        )
      }

      return null;

    }
}

export default CreateUser;
