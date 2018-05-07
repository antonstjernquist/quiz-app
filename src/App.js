import React, { Component } from 'react';
import './App.css';
import { auth, database } from './firebase';
import Header from './components/Header.js';
import Loading from './components/loading.js';
import CreateUser from './components/CreateUser.js';
import Addquestion from './components/Addquestion.js';


class App extends Component {


  constructor(props){
    super(props);
    this.state = {
      loggedin: false,
      user: null,
      renderQuestion: false,
      loading: false,
      changeUsername: false
    }

    /* Auth */
    auth.onAuthStateChanged(this);

  }

  logText(){
    return this.state.user ? 'Logout' : 'Login';
  }
  handleQuestionRender(){
    this.setState({renderQuestion: !this.state.renderQuestion});
  }

  handeLoginClick(e){
    let prevState = this;

    if(this.state.user){
      auth.doSignOut();
      this.setState({user: null})
    } else {
      // Start loading
      this.setState({loading: true});
      auth.doLogInWithGoogle().then(function(result) {

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      console.log('Does this even run?');

      // Remove loading
      prevState.setState({ loading: false })

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

  toggleLoadingState = () => {
    this.setState({loading: !this.state.loading});
  }

  setUser = user => {
    this.setState({user: user});
  }

  toggleChangeUsername = () => {
    console.log('State now is: ', this.state.changeUsername);
    this.setState({changeUsername: !this.state.changeUsername});
  }

  render() {
    return (
      <div className="App">
        <Loading loading={this.state.loading} />
        <CreateUser toggleChangeUsername={this.toggleChangeUsername} doRender={this.state.changeUsername} setUser={this.setUser} user={this.state.user} />
        <Header toggleChangeUsername={this.toggleChangeUsername} user={this.state.user} toggleLoadingState={this.toggleLoadingState}/>
        <h1> Quiz app or something</h1>
        <button onClick={this.handeLoginClick.bind(this)} > {this.logText()} </button>
        <button onClick={this.handleQuestionRender.bind(this)} > New question </button>
        <Addquestion user={this.state.user} doRender={this.state.renderQuestion} />
      </div>
    );
  }
}

export default App;
