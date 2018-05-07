import React, {Component} from 'react';
import "./css/Compete.css"


class Quiz extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const cards = [];
        if (this.props.Quest){
            for (const alternative in this.props.Quest.alternatives) {
                const QuestionObj = this.props.Quest.alternatives[alternative];
                cards.push(
                    <Quizcard
                        onClick={this.props.guessTheAnswer(alternative)} // HÄR FUCKAR DEN
                        key={alternative}
                        alternative={QuestionObj}
                        loaded={this.props.loaded}
                    />
                )
            }
        }
        return (
            <div>
                <h1 className={"quizHeader"}>{this.props.Quest.question}</h1>
                <div className={"quiz-wrapper"}>
                    {cards.length > 0 && cards}
                </div>
            </div>
        )
    }
}

function Quizcard(props) {
    return (
        <div className={"quizCard-wrapper"}>
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
        };
        this.categorySelect = this.categorySelect.bind(this);
        this.guessTheAnswer = this.guessTheAnswer.bind(this);
    }

    categorySelect(event) {
        this.setState({
            loaded: false,
            selectedCategory: event.target.value,
        });
        console.log("Category " + event.target.value);
        console.log("Questions", this.props.questions);
        console.log("COunter")
    }
    guessTheAnswer(ans) {
        // this.setState({
        //     counter: this.state.counter++,
        // });
        console.log("woffff", ans);
    }
    render() {
        let questionsArr;
        if (this.state.selectedCategory) {
            questionsArr = Object.values(this.props.questions[this.state.selectedCategory]);
            setTimeout(() => {
                this.setState({loaded: true});
            }, 5500);
        }
        return (
            <div className={"competeWrapper"}>
                <ChooseCategory categorySelect={this.categorySelect} questions={this.props.questions}/>
                {this.state.selectedCategory &&
                <Quiz guessTheAnswer={this.guessTheAnswer} loaded={this.state.loaded} Quest={questionsArr[this.state.counter]}/>}
            </div> // HÄR SKICKAR JAG NER DEN
        );
    }
}

export default Compete;