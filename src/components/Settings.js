import React, { Component } from 'react';
import { database } from '../firebase';
import "./css/settings.css";

class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {
      settings: null
    }
  }

  componentDidMount(){
    console.log('Settings mounted.');

    database.retrieveSettings()
    .then(result => {
      let data = result.val();
      this.setState({settings: data})
      console.log('Settings are: ', data);
    });
  }

  handleClick = () => {
    console.log('Settings was saved!');
    database.saveSettings(this.state.settings);
  }

  handleTimerChange = event => {
    let settings = this.state.settings;
    settings.timer = event.target.value;
    this.setState({settings: settings});
  }

  handleLimitChange = event => {
    let settings = this.state.settings;
    settings.limit = event.target.value;
    this.setState({settings: settings});
  }

    /* Return */
    render() {
      if(this.state.settings){
        return (
          <div className="settingsDiv">
            <h1> Quiz settings </h1>

            <div className="settingsHolder">
              <span> Questions per game (limit)</span>
              <input onChange={this.handleLimitChange} value={this.state.settings.limit} type="number"/>
            </div>

            <div className="settingsHolder">
              <span> Time per question (seconds) </span>
              <input onChange={this.handleTimerChange} value={this.state.settings.timer} type="number" />
            </div>


            <button onClick={this.handleClick}> Save settings </button>
          </div>
        );
      } else {
        return null;
      }
    }
}

export default Settings;
