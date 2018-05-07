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
      this.updateUserList();
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
        <li key={user.uid}> <span>{user.username} </span> <span> {user.credits} </span></li>
      )
        return (
            <div className="highscoreWrapper">
                <h1> Highscores </h1>
                <div className="highscoreTableHeader">
                  <span> Username </span>
                  <span> Credits </span>
                </div>
                <ul>
                  {list}
                </ul>
            </div>
        );
    }
}

export default Highscores;
