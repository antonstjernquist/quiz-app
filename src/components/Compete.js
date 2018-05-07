import React, {Component} from 'react';
import "./css/Compete.css"

function Counter(props) {
    console.log("Le quest", props.alternative);
    return (
        <div className="Counter-wrapper">
            <span className="counter-question">Question </span>
            <span className="counter">{props.counter + 1}</span>
            <span className="counter">of</span>
            <span className="counter">{props.alternative.length}</span>
        </div>
    )
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
                        loaded={this.props.loaded}
                    />
                )
            }
        }
        return (
            <div>
                <h1 className={"quizHeader"}>{this.props.Quest.question}</h1>
                <Counter counter={this.props.counter} alternative={this.props.allQuest}/>
                <div className={"quiz-wrapper"}>
                    {cards.length > 0 && cards}
                </div>
            </div>
        )
    }
}

function Quizcard(props) {
    return (
        <div onClick={() => {
            props.guessTheAnswer(props.objKey)
        }} className={"quizCard-wrapper"}>
            <div className={"quizCard" + (props.loaded ? ' quizCardFlipped' : null)}>
                <div className={"back"}>
                    <div className={"one"}>
                        <h1>{props.alternative}</h1>
                    </div>
                </div>
                <div className={"front"}>
                    <div className={"one"}>&nbsp;</div>
                </div>
            </div>
        </div>
    )
}

function ChooseCategory(props) {
    if (props.questions !== null) {
        let options = [];
        let counter = 0;
        for (const category in props.questions) {
            options.push(<option key={counter += 1} value={category}>{category}</option>)
        }
        return (
            <div className="chooseCategory-wrapper">
                <span className="chooseCategory">Choose category </span>
                <select onChange={props.categorySelect}>
                    {options}
                </select>
            </div>
        )
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
        };
        this.categorySelect = this.categorySelect.bind(this);
        this.guessTheAnswer = this.guessTheAnswer.bind(this);
        this.loaded = this.loaded.bind(this);
    }

    categorySelect(event) {
        this.setState({
            loaded: false,
            selectedCategory: event.target.value,
        });
        this.setState({
            questionsArr: Object.values(this.props.questions[event.target.value]),
        });
        setTimeout(() => {
            this.loaded();
        }, 4000);
    }

    guessTheAnswer(ans) {
        this.setState({
            counter: this.state.counter + 1,
        });
        console.log("ANS", ans);
        if (ans === this.state.questionsArr[this.state.counter].answer) {
            alert("WIN");
        } else {
            alert("Noob loss");
        }

        console.log("Counter", this.state.counter);
    }

    loaded() {
        this.setState({loaded: true});
    }

    render() {
        return (
            <div className={"competeWrapper"}>
                <ChooseCategory categorySelect={this.categorySelect} questions={this.props.questions}/>
                {this.state.selectedCategory &&
                <Quiz
                    guessTheAnswer={this.guessTheAnswer}
                    loaded={this.state.loaded}
                    allQuest={this.state.questionsArr}
                    counter={this.state.counter}
                    Quest={this.state.questionsArr[this.state.counter]}
                />
                }
            </div>
        );
    }
}

export default Compete;