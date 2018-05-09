import React, {Component} from 'react';
import './css/Tabs.css';
import Compete from "./Compete";
import Addquestion from "./Addquestion";
import Highscores from "./Highscores";
import Profile from "./Profile";
import {database} from "../firebase/firebase";

function Tab(props) {
    const handleSelect = () => {
        props.onSelect(props.tab);
    };
    return (
        <button type={'button'} className={'tab'} onClick={handleSelect}>
            {props.tab}
        </button>
    );
}

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeElement: null,
            questions: [],
        };
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(item) {
        console.log(item);
        this.setState({activeElement: item});
    }

    componentDidMount() {
        const questionsRef = database.ref('questions/');
        questionsRef.on('value', (snapshot) => {
            this.setState({
                questions: snapshot.val()
            });
            console.log("Questions", this.state.questions);

        });

    }

    render() {
        const tabs = this.props.tabs.map((tab, index) => {
            return <Tab tab={tab} key={index} onSelect={this.onSelect}/>;
        });

        let renderElement = null;
        switch (this.state.activeElement) {
            case 'compete':
                renderElement = <Compete questions={this.state.questions}/>;
                break;
            case 'highscore':
                renderElement = <Highscores />;
                break;
            case 'profil':
                renderElement = <Profile user={this.props.user} />;
                break;
            case 'add question':
                renderElement = <Addquestion user={this.props.user} />;
                break;
            default:
                renderElement = <h1>Landing Page, welcome page</h1>;
        }

        return (
            <div className={'flex-column'}>
                <div className={'flex'}>{tabs}</div>
                <div className={"renderElement"}>{renderElement}</div>
            </div>
        );
    }
}

export default Tabs;
