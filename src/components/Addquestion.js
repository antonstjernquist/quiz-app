import React, { Component } from 'react';
import { database } from '../firebase';
import './css/addquestion.css';

class QuestionObject {
  constructor(question, alt1, alt2, alt3, alt4, answer, category){
    this.question = question;
    this.alternatives = {
      alt1: alt1,
      alt2: alt2,
      alt3: alt3,
      alt4: alt4
    }
    this.answer = answer;
    this.category = category;
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
          answer: '',
          category: ''
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
      } else if (type === 'category'){
        this.setState({category: event.target.value})
      }
      console.log('Input change!');
    }

    clearInputs = () => {
      this.setState({question: ''});
      this.setState({alt1: ''});
      this.setState({alt2: ''});
      this.setState({alt3: ''});
      this.setState({alt4: ''});
      this.setState({answer: ''});
      this.setState({category: ''});
    }

    addQuestion = event => {

      let question = new QuestionObject(this.state.question, this.state.alt1, this.state.alt2, this.state.alt3, this.state.alt4, this.state.answer, this.state.category);
      question.push();

      this.clearInputs();

      console.log('Question added!', question);
    }

    setAnswer = (event, answer) => {
      this.setState({answer: answer});
    }

    answerClass = (type) => {
      if(this.state.answer === type){
        return 'answer';
      }
    }

    /* Return */
    render() {
      if(this.props.doRender){
        return (
          <div>
            <h1> Create a question! </h1>
            <div>
              <div className="answer">
                <input onChange={ event => this.handleInput(event, 'question')} value={this.state.question} type="text" placeholder="Question.."/>
              </div>
              <div className="answer">
                <input onChange={ event => this.handleInput(event, 'alt1')} value={this.state.alt1} type="text" placeholder="Answer 1"/>
                <button className={this.answerClass('alt1')} onClick={event => this.setAnswer(event, 'alt1')}><i className="material-icons">{this.state.answer === 'alt1' ? 'check' : 'clear'}</i></button>
              </div>

              <div className="answer">
                <input onChange={ event => this.handleInput(event, 'alt2')} value={this.state.alt2} type="text" placeholder="Answer 2"/>
                <button className={this.answerClass('alt2')} onClick={event => this.setAnswer(event, 'alt2')} ><i className="material-icons">{this.state.answer === 'alt2' ? 'check' : 'clear'}</i></button>
              </div>

              <div className="answer">
                <input onChange={ event => this.handleInput(event, 'alt3')} value={this.state.alt3} type="text" placeholder="Answer 3"/>
                <button className={this.answerClass('alt3')} onClick={event => this.setAnswer(event, 'alt3')} ><i className="material-icons">{this.state.answer === 'alt3' ? 'check' : 'clear'}</i></button>
              </div>

              <div className="answer">
                <input onChange={ event => this.handleInput(event, 'alt4')} value={this.state.alt4} type="text" placeholder="Answer 4"/>
                <button className={this.answerClass('alt4')} onClick={event => this.setAnswer(event, 'alt4')}><i className="material-icons">{this.state.answer === 'alt4' ? 'check' : 'clear'}</i></button>
              </div>

              <div className="answer">
                <input onChange={ event => this.handleInput(event, 'category')} value={this.state.category} type="text" placeholder="Category" />
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
