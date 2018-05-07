import React, {Component} from 'react';
import { database } from '../firebase';
import "./css/highscores.css"



class Highscores extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userlist: []
        };

        let prevState = this;

        database.retrieveAllUsers()
        .then(res => {
          let data = res.val();
          let list = [];

          for(let user in data){
            list.push(data[user]);
          }
          
          prevState.setState({userlist: list});
        })
    }

    render() {

      let list = this.state.userlist.map((user, index) =>
        <li key={user.uid}> {user.username}</li>
      )
        return (
            <div className="highscoreWrapper">
                <h1> Highscores </h1>
                <div className="highscoreTableHeader">
                  <span> Username </span>
                  <span> Score </span>
                </div>
                <ul>

                  {list}

                </ul>
            </div>
        );
    }
}

export default Highscores;
