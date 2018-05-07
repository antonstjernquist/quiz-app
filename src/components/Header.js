import React, { Component } from 'react';
import { auth } from '../firebase';
import './css/header.css';

class Header extends Component {
    /* Constructor */
    constructor(props) {
        super(props);
        console.log('Props are: ', props);

        /* Initial state of component */
        this.state = {
          hej: 'hej'
        };

    }

    /* Return */
    render() {
      let user = this.props.user;
      if(user){
        return (

          <header>
            <h1> Quiz app </h1>
            <div>

              <img alt="You" src={user.photoURL}/>

              <p className="link" onClick={this.props.toggleChangeUsername}> { user.username }</p>
              <div className="divider">&nbsp;</div>
              <p onClick={auth.doSignOut} className="link"> Logga ut </p>
            </div>
          </header>

        )
      } else {

        return (
          <header>
            <h1> Quiz app </h1>
            <div>
              <p onClick={(e) => {
                  let prevState = this;
                  auth.doLogInWithGoogle().then(function (){
                    prevState.props.toggleLoadingState();
                  });
                  this.props.toggleLoadingState();
              }} className="link"> Logga in </p>
            </div>
          </header>
        )

      }
    }
}

export default Header;
