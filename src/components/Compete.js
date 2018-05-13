import React, { Component } from "react";
import { database } from '../firebase';
import "./css/Compete.css";

function Counter(props) {
  return (
    <div className="Counter-wrapper">
    <div className="timer"><span> {props.timer}</span></div>
      <span className="counter-question">Question </span>
      <span className="counter">{props.counter + 1}</span>
      <span className="counter">of</span>
      <span className="counter">{props.alternative.length}</span>
      <div />
    </div>
  );
}

class Quiz extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const cards = [];
    if (this.props.Quest) {
      for (const alternative in this.props.Quest.alternatives) {
        const QuestionObj = this.props.Quest.alternatives[alternative];
        cards.push(
          <Quizcard
            guessTheAnswer={this.props.guessTheAnswer}
            key={alternative}
            objKey={alternative}
            alternative={QuestionObj}
            winner={this.props.winner === alternative}
            loaded={this.props.loaded}
          />
        );
      }
    }
    return (
      <div>
        <h1 className={"quizHeader"}>{this.props.Quest.question}</h1>
        <Counter
          counter={this.props.counter}
          timer={this.props.timer}
          alternative={this.props.allQuest}
        />
        <div className={"quiz-wrapper"}>{cards.length > 0 && cards}</div>
      </div>
    );
  }
}

function Quizcard(props) {
  return (
    <div

      className={"quizCard-wrapper"}
    >
      <div className={"quizCard" + (props.loaded ? " quizCardFlipped" : "")}>
        <div className={"back"} onClick={() => {
          props.guessTheAnswer(props.objKey);
        }}>
          <div className={"one" + (props.winner ? " winner" : "")}>
            <h1>{props.alternative}</h1>
          </div>
        </div>
        <div className={"front"}>
          <div className={"one"}>&nbsp;</div>
        </div>
      </div>
    </div>
  );
}

function ChooseCategory(props) {
  if (props.questions !== null) {
    let options = [];
    let counter = 0;
    for (const category in props.questions) {
      options.push(
        <option key={(counter += 1)} value={category}>
          {category}
        </option>
      );
    }
    return (
      <div className="chooseCategory-wrapper">
        <span className="chooseCategory">Choose category </span>
        <select onChange={props.categorySelect}>{options}</select>
      </div>
    );
  }
}

class Compete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
      counter: 0,
      loaded: false,
      questionsArr: [],
      timer: 10,
      stop: false,
      limit: 3
    };
    this.categorySelect = this.categorySelect.bind(this);
    this.guessTheAnswer = this.guessTheAnswer.bind(this);
    this.loaded = this.loaded.bind(this);
    this.handleWin = this.handleWin.bind(this);
    this.handleLoss = this.handleLoss.bind(this);
    this.initializeTimer = this.initializeTimer.bind(this);
  }

  categorySelect(event) {
    this.stopTimer();
    let e;
    if (!event.target.value) {
      e = this.state.selectedCategory;
    } else {
      e = event.target.value
    }
    const randomSort2 = arr => {
        let newArr = [];
        while(newArr.length < arr.length){
            var temp = parseInt( Math.random() * arr.length);
            if(newArr.includes(arr[temp])){
              continue;
            } else {
              newArr.push(arr[temp]);
            }
        }
        return newArr.slice(0, this.state.limit);
    }

    const questionsArray = randomSort2(Object.values(this.props.questions[e]));
    this.setState({
      loaded: false,
      counter: 0,
      selectedCategory: e,
      questionsArr: questionsArray
    });

    setTimeout(() => {
      this.loaded();
      this.setState({ start: true });
      this.initializeTimer();
    }, 2000);
  }
  initializeTimer() {
    console.log('Starting timer.');
    this.setState({stop: false});
    this.setState({timer: 10});
    const timer = setInterval(() => {
      if(this.state.timer){
        this.setState({ timer: this.state.timer - 1 });
      }
      
      if(this.state.timer <= 0 || this.state.stop === true){
        console.log('Timer stopped!!');
        console.log('Timer is: ', this.state.timer);
        console.log('Stop is: ', this.state.stop);

        /* If timer is 0, guessTheAnswer */
        if(this.state.timer <= 0 && !this.state.stop){
          this.guessTheAnswer('Out of time!');
        }
        clearInterval(timer);
      }
    }, 1000);
  }

  stopTimer = () => {
    this.setState({stop: true, timer: null});
  }

  guessTheAnswer(ans) {
    this.stopTimer();
    setTimeout(() => {

      /* Only start the timer again if there's questions left to answer! */
      if(this.state.counter + 1 < this.state.questionsArr.length){
        this.initializeTimer();
      }

      /* Increase the counter */
      this.setState({
        counter: this.state.counter + 1,
        winner: ""
      });
    }, 2000);

    this.setState({
      winner: this.state.questionsArr[this.state.counter].answer
    });

    console.log("ANS", ans);
    if (ans === this.state.questionsArr[this.state.counter].answer) {
      this.handleWin();
    } else {
      this.handleLoss();
    }

    console.log("Counter", this.state.counter);
  }

  handleWin() {
    database.addCredits(this.props.user.uid, 50);
    database.addWin(this.props.user.uid);
    console.log("WININININ");
  }
  handleLoss() {
    database.addLoss(this.props.user.uid);
    console.log("LOSSSS");
  }
  loaded() {
    this.setState({ loaded: true });
  }
  componentWillUnmount(){
    this.stopTimer();
  }
  render() {
    return (
      <div className={"competeWrapper"}>
        <ChooseCategory
          categorySelect={this.categorySelect}
          questions={this.props.questions}
        />
        {this.state.selectedCategory &&
          this.state.counter + 1 <= this.state.questionsArr.length && (
            <Quiz
              guessTheAnswer={this.guessTheAnswer}
              loaded={this.state.loaded}
              allQuest={this.state.questionsArr}
              counter={this.state.counter}
              timer={this.state.timer}
              winner={this.state.winner}
              Quest={this.state.questionsArr[this.state.counter]}
            />
          )}
        {this.state.counter >= this.state.questionsArr.length &&
          this.state.selectedCategory && (
            <button onClick={this.categorySelect} type="button">Play again</button>
          )}
      </div>
    );
  }
}

export default Compete;
