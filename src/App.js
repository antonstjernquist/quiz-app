import React, { Component } from 'react';
import './App.css';
import { auth, database } from './firebase';
import Header from './components/Header.js';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      loggedin: false,
    }

  }

  logText(){
    return this.state.loggedin ? 'Logga ut' : 'Logga in';
  }

  handeLoginClick(e){
    let prevState = this;

    if(this.state.loggedin){
      auth.doSignOut();
      this.setState({loggedin: false})
    } else {
      auth.doLogInWithGoogle().then(function(result) {

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      prevState.setState({ loggedin: true })
      /* Log it for the lulz */
      console.log('Data: ', {
        token: token,
        user: user
      });

      }).catch(function(error) {
        console.log('ERROR:', error);
      });
    }
  }

  /* When it has mounted */
  componentDidMount(){
    database.logStuff();
    // db.ref('questions').on('child_added', function(snapshot){
    //   console.log('Value of snapshot is: ', snapshot.val());
    // });
  }



  render() {
    return (
      <div className="App">
        <Header loggedin={this.state.loggedin}/>
        <h1> Firebase example in React</h1>
        <button onClick={this.handeLoginClick.bind(this)} > {this.logText()} </button>
      </div>
    );
  }
}

export default App;
