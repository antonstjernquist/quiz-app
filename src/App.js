import React, { Component } from 'react';
import './App.css';
import { auth, database } from './firebase';
import Header from './components/Header.js';
import Addquestion from './components/Addquestion.js';


class App extends Component {




  constructor(props){
    super(props);
    this.state = {
      loggedin: false,
      user: null,
      renderQuestion: false
    }

    /* Auth */
    auth.onAuthStateChanged(this);

  }

  logText(){
    return this.state.loggedin ? 'Logga ut' : 'Logga in';
  }
  handleQuestionRender(){
    this.setState({renderQuestion: !this.state.renderQuestion});
  }

  handeLoginClick(e){
    let prevState = this;

    if(this.state.loggedin){
      auth.doSignOut();
      this.setState({loggedin: false})
      this.setState({user: null})
    } else {
      auth.doLogInWithGoogle().then(function(result) {

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      prevState.setState({ loggedin: true })
      prevState.setState({ user: user })

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
        <Header loggedin={this.state.loggedin} user={this.state.user} />
        <h1> Firebase example in React</h1>
        <button onClick={this.handeLoginClick.bind(this)} > {this.logText()} </button>
        <button onClick={this.handleQuestionRender.bind(this)} > New question </button>
        <Addquestion doRender={this.state.renderQuestion} />
      </div>
    );
  }
}

export default App;
