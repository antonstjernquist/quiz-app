import React, {Component} from 'react';
import { database } from '../firebase';
import "./css/highscores.css"



class Highscores extends Component {
    constructor(props) {
        super(props);
        this.state = {
          userlist: []
        };


    }

    componentDidMount(){
      this.updateUserList();
      database.updateHighscores(this);
    }

    updateUserList = () => {

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
      let oldList = this.state.userlist.sort( (x,y) => {
        if(x.credits < y.credits) {
          return 1;
        } else if(x.credits > y.credits){
          return -1;
        } else {
          return 0
        }
      })
      let list = oldList.map((user, index) =>
        <li key={user.uid}> <span className="ranking"> {index + 1} </span> <span>{user.username} </span> <span> {user.credits} </span> <span> {user.displayName.split(' ')[0]} </span> <span> {user.admin.toString()} </span></li>
      )
        return (
            <div className="highscoreWrapper">
                <h1> Highscores </h1>
                <div className="highscoreTableHeader">
                  <span className="ranking"> Ranking </span>
                  <span> Username </span>
                  <span> Credits </span>
                  <span> Name</span>
                  <span> Admin </span>
                </div>
                <ul>
                  {list}
                </ul>
            </div>
        );
    }
}

export default Highscores;
