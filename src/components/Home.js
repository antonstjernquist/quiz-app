import React, { Component } from 'react';
import { auth, providerData} from '../firebase';
import './css/home.css';
class Home extends Component {

  constructor(props){
    super(props);
  }

  handleClick = () => {
    auth.doLogInWithGoogle(this)
    .then(result => {
      console.log('Result of this is:', result);
    })
    .catch(error => {
      console.log('Something went wrong! ERROR: ', error);
      this.props.toggleLoadingState(false);
    })
    this.props.toggleLoadingState(true);
  }


    render() {

      if(this.props.user){
        return (
          <div className="homeDiv">
            <h1> Welcome back, {this.props.user.username}! </h1>
          </div>
        );
      } else {
        return (
          <div className="homeDiv">
            <h1> Welcome to the Quiz App</h1>
            <h3> Login to get started </h3>
            <button onClick={this.handleClick}> Login </button>
          </div>
        );
      }
    }
}

export default Home;
