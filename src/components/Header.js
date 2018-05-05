import React, { Component } from 'react';
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

        // this.logText = this.logText.bind(this);
    }

    logText(){
      return this.props.loggedin ? 'Logga ut' : 'Logga in'
    }

    userObject(){

      if(this.props.user){
        return this.props.user;
      } else {
        return '';
      }
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

              <p> { user.displayName }</p>
              <div className="divider">&nbsp;</div>
              <p className="link"> Logga ut </p>
            </div>
          </header>

        )
      } else {

        return (
          <header>
            <h1> Quiz app </h1>
            <div>
              <p className="link"> Logga in </p>
            </div>
          </header>
        )

      }
    }
}

export default Header;
