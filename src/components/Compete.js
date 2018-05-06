import React, {Component} from 'react';
import "./css/Compete.css"
import {getQuestions} from "../firebase/database";

function Quizcard(props) {
    return (
        <div className={"quizCard-wrapper"}>
            <div>{props.quizQuest}</div>
        </div>
    )
}

function ChooseCategory(props) {
    if (props.questions !== null) {
        let options = [];
        let counter = 0;
        for (const cat in props.questions) {
            options.push(<option key={counter += 1} value={cat}>{cat}</option>)
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
        };
        this.categorySelect = this.categorySelect.bind(this);
    }
    categorySelect(event){
        this.setState({
            selectedCategory: event.target.value,
        });
        console.log("Category " + event.target.value);
    }
    render() {
        return (
            <div className={"competeWrapper"}>
                <ChooseCategory categorySelect={this.categorySelect} questions={this.props.questions}/>
                <Quizcard Quest={"WHOHOHO"}/>
            </div>
        );
    }
}

export default Compete;