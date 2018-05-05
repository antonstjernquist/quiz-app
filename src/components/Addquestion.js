import React, { Component } from 'react';
import { database } from '../firebase';
import './css/addquestion.css';

class QuestionObject {
  constructor(question, alt1, alt2, alt3, alt4, answer){
    this.question = question;
    this.alt1 = alt1;
    this.alt2 = alt2;
    this.alt3 = alt3;
    this.alt4 = alt4;
    this.answer = answer;
  }
  push(){
    database.addQuestion(this);
  }
}

class Addquestion extends Component {
    /* Constructor */
    constructor(props) {
        super(props);
        console.log('Props are: ', props);

        /* Initial state of component */
        this.state = {
          render: props.doRender,
          question: '',
          alt1: '',
          alt2: '',
          alt3: '',
          alt4: '',
          answer: ''
        };
    }

    handleInput = (event, type) => {
      if(type === 'question'){
        this.setState({ question: event.target.value })
      } else if (type === 'alt1'){
        this.setState({alt1: event.target.value})
      } else if (type === 'alt2'){
        this.setState({alt2: event.target.value})
      } else if (type === 'alt3'){
        this.setState({alt3: event.target.value})
      } else if (type === 'alt4'){
        this.setState({alt4: event.target.value})
      }
      console.log('Input change!');
    }

    addQuestion = event => {

      let question = new QuestionObject(this.state.question, this.state.alt1, this.state.alt2, this.state.alt3, this.state.alt4);
      question.push();

      this.setState({question: ''});
      this.setState({alt1: ''});
      this.setState({alt2: ''});
      this.setState({alt3: ''});
      this.setState({alt4: ''});

      console.log('Question added!', question);
    }

    setAnswer = (event, answer) => {
      this.setState({answer: answer});
      event.target.className = 'answer';
    }

    /* Return */
    render() {
      if(this.props.doRender){
        return (
          <div>
            <h1> Skapa fråga! </h1>
            <div>
              <input onChange={ event => this.handleInput(event, 'question')} value={this.state.question} type="text" placeholder="Fråga.."/>

              <div className="answer">
                <input onChange={ event => this.handleInput(event, 'alt1')} value={this.state.alt1} type="text" placeholder="Svar 1"/>
                <button onClick={event => this.setAnswer(event, 'alt1')}><i className="material-icons">check</i></button>
              </div>

              <div className="answer">
                <input onChange={ event => this.handleInput(event, 'alt2')} value={this.state.alt2} type="text" placeholder="Svar 2"/>
                <button onClick={event => this.setAnswer(event, 'alt2')} ><i className="material-icons">check</i></button>
              </div>

              <div className="answer">
                <input onChange={ event => this.handleInput(event, 'alt3')} value={this.state.alt3} type="text" placeholder="Svar 3"/>
                <button onClick={event => this.setAnswer(event, 'alt3')} ><i className="material-icons">check</i></button>
              </div>

              <div className="answer">
              <input onChange={ event => this.handleInput(event, 'alt4')} value={this.state.alt4} type="text" placeholder="Svar 4"/>
              <button onClick={event => this.setAnswer(event, 'alt4')}><i className="material-icons">check</i></button>
              </div>

              <br/>
              <button onClick={this.addQuestion}> Add Question </button>
            </div>

          </div>
        )
      } else {
        return null
      }

    }
}

export default Addquestion;
