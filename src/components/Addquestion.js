import React, {Component} from 'react';
import {database} from '../firebase';
import './css/addquestion.css';

class QuestionObject {
    constructor(question, alt1, alt2, alt3, alt4, answer, category, creator) {
        this.question = question;
        this.alternatives = {
            alt1: alt1,
            alt2: alt2,
            alt3: alt3,
            alt4: alt4
        }
        this.answer = answer;
        this.category = category.toLowerCase();
        this.creator = creator;
    }

    push() {
        database.addQuestion(this);
    }
}

function QuestionList (props){
  if(props.list.length){
    let list = props.list.map((item, index) => {
      return (
        <div className="resultQuestion" key={index + ':' + item.difficulty}>
          <h2> {item.question} </h2>
          <br />
          Answers:
          <br />
          {item.correct_answer.toString()}
          <br />
          {item.incorrect_answers[0].toString()}
          <br />
          {item.incorrect_answers[1].toString()}
          <br />
          {item.incorrect_answers[2].toString()}
          <br />
          <button onClick={event => props.handleClick(event, index)}> Add this question </button>
        </div>)
    });

    return (
      <div className="resultDiv">
        <h1> Search results </h1>
        <ul>
          {list}
        </ul>
      </div>
    )
  } else {
    return null;
  }

}

class NewQuestion extends Component{
  constructor(props){
    super(props);
    console.log('DISPLAYING NEW QUESTION');
    this.state = {
      category: ''
    }
  }

  handleChange = event => {
    this.setState({category: event.target.value });
  }

  render(){
    if(this.props.question){
      return (<div className="popup">
        <h3> Choose category </h3>
        <input type="text" onChange={this.handleChange}value={this.state.category} placeholder="Category.."/>
        <button onClick={event => this.props.handleClick(event, this.state.category)}> Add </button>
        <button onClick={event => this.props.handleClick(event, null)}> Close </button>
      </div>)
    } else {
      return null;
    }
  }
}

class Addquestion extends Component {
    /* Constructor */
    constructor(props) {
        super(props);
        console.log('Props are: ', props);

        /* Initial state of component */
        this.state = {
            question: '',
            alt1: '',
            alt2: '',
            alt3: '',
            alt4: '',
            answer: '',
            category: '',
            list: [],
            newQuestion: null,
            questionsNum: '',
            difficulty: ''
        };
    }

    handleInput = (event, type) => {
        if (type === 'question') {
            this.setState({question: event.target.value})
        } else if (type === 'alt1') {
            this.setState({alt1: event.target.value})
        } else if (type === 'alt2') {
            this.setState({alt2: event.target.value})
        } else if (type === 'alt3') {
            this.setState({alt3: event.target.value})
        } else if (type === 'alt4') {
            this.setState({alt4: event.target.value})
        } else if (type === 'category') {
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

        let question = new QuestionObject(this.state.question, this.state.alt1, this.state.alt2, this.state.alt3, this.state.alt4, this.state.answer, this.state.category, this.props.user);
        question.push();

        this.clearInputs();

        console.log('Question added!', question);
    }

    setAnswer = (event, answer) => {
        this.setState({answer: answer});
    }

    answerClass = (type) => {
        if (this.state.answer === type) {
            return 'answer';
        }
    }

    handleFetch = () => {
      let prevState = this;
      let num = this.state.questionsNum ? Number(this.state.questionsNum) : 5;
      let difficulty = this.state.difficulty ? this.state.difficulty.toLowerCase() : 'easy';
      fetch('https://opentdb.com/api.php?amount='+num+'&difficulty='+difficulty+'&type=multiple')
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log('Result: ', json.results);
        prevState.setState({list: json.results});
      })
    }

    newQuestionClick = (event, index) => {
      console.log('This runs');
      this.setState({newQuestion: this.state.list[index]});
    }

    addQuestion = (event, category) => {
      if(category){

        /* Add it */
        let q = this.state.newQuestion;
        let arr = [];

        /* Push into ARR */
        arr.push(q.incorrect_answers[0]);
        arr.push(q.incorrect_answers[1]);
        arr.push(q.incorrect_answers[2]);
        arr.push(q.correct_answer);

        /* Create new arr */
        let newArr = [];

        /* Randomize arr */
        while(newArr.length < 4){
          var temp = parseInt( Math.random() * 4, 10);
          console.log('Temp is: ', temp);
          if(newArr.includes(arr[temp])){
            continue;
          } else {
            newArr.push(arr[temp]);
          }
        }

        /* Answer is in position? */
        let answerPosition = newArr.indexOf(q.correct_answer);

        /* Retrieve correct alt */
        let answer = 'alt' + (answerPosition + 1);
        /* Create the object to be sent to the database */
        let questionObject = {
          question: q.question,
          category: category,
          alternatives: {
            alt1: newArr[0],
            alt2: newArr[1],
            alt3: newArr[2],
            alt4: newArr[3]
          },
          answer: answer
        }
        console.log('Questions Object: ', questionObject);
        database.newQuestionFromSearch(category, questionObject);
        console.log('Category is: ', category);
        console.log('Question is: ', this.state.newQuestion);
      }
      /* else close (either way) */
      this.setState({newQuestion: null});
    }

    handleSelectChange = event => {
      console.log('Select was changed to', event.target.value);
      this.setState({difficulty: event.target.value});
    }

    handleNumber = event => {
      console.log('New question number: ', event.target.value);
      this.setState({questionsNum: event.target.value});
    }

    /* Return */
    render() {
        return (
            <div className={"wrapper"}>
                <h1> Create a question! </h1>
                <div>
                    <div className="answer">
                        <input onChange={event => this.handleInput(event, 'question')} value={this.state.question}
                               type="text" placeholder="Question.."/>
                    </div>
                    <div className="answer">
                        <input onChange={event => this.handleInput(event, 'alt1')} value={this.state.alt1} type="text"
                               placeholder="Answer 1"/>
                        <button className={this.answerClass('alt1')} onClick={event => this.setAnswer(event, 'alt1')}><i
                            className="material-icons">{this.state.answer === 'alt1' ? 'check' : 'clear'}</i></button>
                    </div>

                    <div className="answer">
                        <input onChange={event => this.handleInput(event, 'alt2')} value={this.state.alt2} type="text"
                               placeholder="Answer 2"/>
                        <button className={this.answerClass('alt2')} onClick={event => this.setAnswer(event, 'alt2')}><i
                            className="material-icons">{this.state.answer === 'alt2' ? 'check' : 'clear'}</i></button>
                    </div>

                    <div className="answer">
                        <input onChange={event => this.handleInput(event, 'alt3')} value={this.state.alt3} type="text"
                               placeholder="Answer 3"/>
                        <button className={this.answerClass('alt3')} onClick={event => this.setAnswer(event, 'alt3')}><i
                            className="material-icons">{this.state.answer === 'alt3' ? 'check' : 'clear'}</i></button>
                    </div>

                    <div className="answer">
                        <input onChange={event => this.handleInput(event, 'alt4')} value={this.state.alt4} type="text"
                               placeholder="Answer 4"/>
                        <button className={this.answerClass('alt4')} onClick={event => this.setAnswer(event, 'alt4')}><i
                            className="material-icons">{this.state.answer === 'alt4' ? 'check' : 'clear'}</i></button>
                    </div>

                    <div className="answer">
                        <input onChange={event => this.handleInput(event, 'category')} value={this.state.category}
                               type="text" placeholder="Category"/>
                    </div>

                    <br/>
                    <button onClick={this.addQuestion}> Add Question</button>
                </div>

                <div className="searchDiv">
                  <h1> Search for a question with <a target="_blank"href="https://opentdb.com/"> Open Trivia Database </a></h1>
                  <input onChange={this.handleNumber} value={this.state.questionsNum} type="number" placeholder="Number of questions.. (Max 50)"/>

                  <span> Difficulty </span>
                  <select onChange={this.handleSelectChange}>
                      <option> Easy </option>
                      <option> Medium </option>
                      <option> Hard </option>
                  </select>

                  <button onClick={this.handleFetch}> {this.state.list.length ? 'Refresh' : 'Search'} </button>

                </div>

                <QuestionList handleClick={this.newQuestionClick} list={this.state.list}/>
                <NewQuestion handleClick={this.addQuestion} question={this.state.newQuestion}/>
            </div>
        )
    }
}

export default Addquestion;
