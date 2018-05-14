import React, { Component } from "react";
import { database } from "../firebase";
import "./css/Compete.css";

function Counter(props) {
  return (
    <div className="Counter-wrapper">
      <div className="timer">
        <span> {props.timer}</span>
      </div>
      <span className="counter-question">Question </span>
      <span className="counter">{props.counter + 1}</span>
      <span className="counter">of</span>
      <span className="counter">{props.alternative.length}</span>
      <div />
    </div>
  );
}

class Quiz extends Component {
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
    <div className={"quizCard-wrapper"}>
      <div className={"quizCard" + (props.loaded ? " quizCardFlipped" : "")}>
        <div
          className={"back"}
          onClick={() => {
            props.guessTheAnswer(props.objKey);
          }}
        >
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
        <div className="selectWrapper">
          <select onChange={props.categorySelect}>{options}</select>
        </div>
      </div>
    );
  }
}

class Compete extends Component {
  constructor(props) {
    super(props);
    if(props.competeState){
      console.log('Setting state from competeState, and that state is: ', props.competeState);

      this.state = {...props.competeState,
        competeState: true}

    } else {
      console.log('Setting initial state from values');
      this.state = {
        selectedCategory: null,
        counter: 0,
        loaded: false,
        questionsArr: [],
        timer: 0,
        stop: false,
        limit: 3,
        defaultTimer: null
      };
    }

    this.categorySelect = this.categorySelect.bind(this);
    this.guessTheAnswer = this.guessTheAnswer.bind(this);
    this.loaded = this.loaded.bind(this);
    this.handleWin = this.handleWin.bind(this);
    this.handleLoss = this.handleLoss.bind(this);
    this.initializeTimer = this.initializeTimer.bind(this);
  }

  componentDidMount() {
    database.retrieveSettings().then(result => {
      let data = result.val();
      this.setState({ defaultTimer: data.timer, limit: data.limit });
    });

    if(this.state.competeState){
      console.log('Compete state is true! Lets remove this question from you.');
      this.guessTheAnswer('Changed back from other component');
    } else {
      console.log('Regular game');
    }

    // const count = localStorage.getItem("counter");
    // const cat = localStorage.getItem("selectedCategory");
    // if (!count && !cat) {
    //   localStorage.setItem("counter", "0");
    //   localStorage.setItem("cat", " ");
    // } else {
    //   this.setState(() => {
    //     return {
    //       counter: Number(localStorage.getItem("counter")),
    //       selectedCategory: localStorage.getItem("cat")
    //     };
    //   });
    //   setTimeout(() => {
    //     this.categorySelect("save");
    //   }, 1000);
    // }
  }

  categorySelect(event) {
    this.stopTimer();
    let e;
    if (event === "save") {
      console.log('CAT GAME');
      if(localStorage.getItem("cat")){
        e = localStorage.getItem("cat");
      } else {
        return;
      }
    } else if (event === "newGame") {
      console.log('NEW GAME');
      e = this.state.selectedCategory;
    } else {
      e = event.target.value;
    }
    const randomSort2 = arr => {
      let newArr = [];
      while (newArr.length < arr.length) {
        const temp = parseInt(Math.random() * arr.length, 10);
        if (newArr.includes(arr[temp])) {
          continue;
        } else {
          newArr.push(arr[temp]);
        }
      }
      return newArr.slice(0, this.state.limit);
    };
    const questionsArray = randomSort2(Object.values(this.props.questions[e]));
    this.setState({
      loaded: false,
      counter: event === "save" ? Number(localStorage.getItem("counter")) : 0,
      selectedCategory: e,
      questionsArr: questionsArray
    });

    setTimeout(() => {
      const hasMore = Number(localStorage.getItem('counter')) <= this.state.questionsArr.length;
      if (hasMore && event === "save") {
          localStorage.incrementTransaction("counter", 1);
          this.handleLoss();
      }
      if (hasMore) {
          this.loaded();
          this.setState({ start: true });
          this.initializeTimer();
      } else {
          localStorage.setItem('counter', "0");
          localStorage.setItem('cat', "");
      }

    }, 2000);
  }

  initializeTimer() {
    const defaultTimer = this.state.defaultTimer;
    // console.log("Starting timer.");
    this.setState({ stop: false });
    this.setState({ timer: defaultTimer });
    const timer = setInterval(() => {
      if (this.state.timer) {
        this.setState({ timer: this.state.timer - 1 });
      }

      if (this.state.timer <= 0 || this.state.stop === true) {
        // console.log("Timer stopped!!");
        // console.log("Timer is: ", this.state.timer);
        // console.log("Stop is: ", this.state.stop);

        /* If timer is 0, guessTheAnswer */
        if (this.state.timer <= 0 && !this.state.stop) {
          this.guessTheAnswer("Out of time!");
        }
        clearInterval(timer);
      }
    }, 1000);
  }

  stopTimer = () => {
    this.setState({ stop: true, timer: null });
  };

  guessTheAnswer(ans) {
    this.stopTimer();
    setTimeout(() => {
      /* Only start the timer again if there's questions left to answer! */
      if (this.state.counter + 1 < this.state.questionsArr.length) {
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

    if (ans === this.state.questionsArr[this.state.counter].answer) {
      this.handleWin();
    } else {
      this.handleLoss();
    }
    localStorage.setItem("counter", "" + this.state.counter);
  }

  handleWin() {
    database.addCredits(this.props.user.uid, 50);
    database.addWin(this.props.user.uid);
  }
  handleLoss() {
    database.addLoss(this.props.user.uid);
  }
  loaded() {
    this.setState({ loaded: true });
  }
  componentWillUnmount() {
    this.stopTimer();
    console.log(this);
    if(this.state.timer){
      console.log('Quiz was unmounted while active. Saving state: ', this.state);
      this.props.setCompeteState(this.state);
    } else {
      localStorage.setItem("cat", '');
    }
      if(!this._unmounted) {
          if (this.state.selectedCategory) {
              localStorage.setItem("cat", this.state.selectedCategory);
          }
      }

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
            <button
              onClick={() => {
                this.categorySelect("newGame");
              }}
              type="button"
            >
              Play again
            </button>
          )}
      </div>
    );
  }
}

export default Compete;
