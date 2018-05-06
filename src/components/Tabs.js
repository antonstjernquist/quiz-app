import React, { Component } from 'react';
import './css/Tabs.css';
import Compete from "./Compete";
import { database } from "../firebase/firebase";
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
        this.setState({ activeElement: item });
    }

    componentDidMount() {
        const questionsRef = database.ref('questions/');
        let val = null;
        questionsRef.on('value', (snapshot) => {
            this.setState({
                questions: snapshot.val()
            });
        });

    }

    render() {
        const tabs = this.props.tabs.map((tab, index) => {
            return <Tab tab={tab} key={index} onSelect={this.onSelect} />;
        });

        let renderElement = null;
      switch (this.state.activeElement) {
        case 'tävla':
          renderElement = <Compete questions={this.state.questions}/>;
          break;
        case 'highscore':
          renderElement = <h1>highscore</h1>;
          break;
        case 'profil':
          renderElement = <h1>Profil</h1>;
          break;
        default:
          renderElement = <h1>Welcome select a option in the menu</h1>;
      }

        return (
            <div className={'flex-column'}>
                <div className={'flex'}>{tabs}</div>
                <div>{renderElement}</div>
            </div>
        );
    }
}

export default Tabs;
