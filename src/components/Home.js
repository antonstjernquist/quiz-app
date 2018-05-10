import React, { Component } from 'react';
import { auth, providerData, database} from '../firebase';
import './css/home.css';


function NewNewsButton(props) {
  if(props.user.admin){
    return (
      <button onClick={props.handleClick}> Toggle article creation </button>
    )
  } else {
    return null;
  }
}

class NewNewsArticle extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      content: ''
    }
  }
  handleChange = (event, type = 'content') => {
    if(type === 'title'){
      this.setState({title: event.target.value})
    } else {
      this.setState({content: event.target.value})
    }
  }

  handleClick = () => {

    let articleObject = {
      title: this.state.title,
      content: this.state.content,
      created: new Date().getTime(),
      author: this.props.user.uid
    }

    database.newArticle(articleObject);
  }

  render(){
    if(this.props.render){
      return (
        <div className="newArticle">
          <input onChange={ event => this.handleChange(event, 'title')} value={this.state.title} type="text" placeholder="Title.."/>
          <textarea onChange={this.handleChange}type="text" value={this.state.content} placeholder="Content.."/>
          <button onClick={this.handleClick}> Create </button>
        </div>
      )
    } else {
      return null;
    }
  }
}

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      newsList: [],
      newArticle: false
    }
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


  componentDidMount(){
    database.retrieveNews(this);
  }

  toggleArticleCreation = () => {
    this.setState({newArticle: !this.state.newArticle})
  }

  logStuff = () => {
    console.log('stuff');
  }

    render() {

      if(this.props.user){

        /* News */
        let oldList = this.state.newsList;
        let list = oldList.map( (news, index) => {
          return (
            <div className="newsDiv" key={news.title + '-' + index}>
              <h3> {news.title} </h3>
              <p> {news.content} </p>
            </div>
          )
        });

        /* logged in */
        return (
          <div className="homeDiv">
            <h1> Welcome back, {this.props.user.username}! </h1>
            <h2> Latest news </h2>
            <div className="newsHolder">
              {list}
            </div>
            <NewNewsButton handleClick={this.toggleArticleCreation} user={this.props.user} />
            <NewNewsArticle user={this.props.user} render={this.state.newArticle} />
          </div>
        );
      } else {

        /* Logged out */
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
