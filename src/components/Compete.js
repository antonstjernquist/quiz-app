import React, {Component} from 'react';
import "./css/Compete.css"


class Quiz extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const cards = [];
        for (const alternative in this.props.Quest.alternatives) {
            cards.push(
                <Quizcard key={alternative} alternative={this.props.Quest.alternatives[alternative]}
                          loaded={this.props.loaded}/>
            )
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
                    <div className={"one"}></div>
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

    }

    categorySelect(event) {
        this.setState({
            loaded: false,
            selectedCategory: event.target.value,
        });
        console.log("Category " + event.target.value);
        console.log("Questions", this.props.questions);
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
                <Quiz loaded={this.state.loaded} Quest={questionsArr[this.state.counter]}/>}
            </div>
        );
    }
}

export default Compete;