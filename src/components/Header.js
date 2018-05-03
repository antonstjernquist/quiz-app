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

    /* Return */
    render() {

        return (
            <header>
              <h1> Quiz app </h1>

              <div>
                <img alt="You" src="https://lh3.googleusercontent.com/-AxgGHdqx1CM/AAAAAAAAAAI/AAAAAAAAABo/hrcuCx0tzAU/photo.jpg"/>
                <p> Anton#2312</p>
                <div className="divider">&nbsp;</div>
                <p className="link"> { this.logText() } </p>
              </div>
            </header>
        );
    }
}

export default Header;
