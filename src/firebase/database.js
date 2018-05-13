import {database} from './firebase.js';


/* Databse functions */
export const logStuff = () => {
    console.log('I log stuff :)');
}

export const addQuestion = (questionObj) => {
    database.ref('questions/' + questionObj.category).push(questionObj);
}

export function getQuestions() {
    const starCountRef = database.ref('questions/');
    let val = null;
    starCountRef.on('value', function (snapshot) {
        val  = snapshot.val();
    });
    console.log("FB Snapshot:", val);
    return val;
}

export const retrieveAllUsers = () => {
  return database.ref('users/').once('value');
}

export const makeAdmin = uid => {
  database.ref('users/' + uid + '/admin').set(true);
}
export const removeAdmin = uid => {
  database.ref('users/' + uid + '/admin').set(false);
}

export const createUser = user => {
  database.ref('users/' + user.uid).set(user);
}

export const retrieveUser = uid => {
  return database.ref('users/' + uid).once('value');
}

export const updateUsername = (uid, username) => {
  return database.ref('users/' + uid + '/username').set(username);
}

export const setCredits = (uid, credits) => {
  console.log('Setting balance to: ' + credits);
  return database.ref('users/' + uid).update({credits: Number(credits)});
}

export const addCredits = (uid, credits) => {
  console.log('Increasing balance by: ' + credits);

  database.ref('users/' + uid + '/credits').once('value', function (snapshot){
    let data = snapshot.val();
    let newBalance = data + credits
    database.ref('users/' + uid + '/credits').set(newBalance);
  })
}

export const retrieveNews = state => {
  let newsList = [];
  console.log('Retrieving news..');
  database.ref('news/').on('child_added', function(snapshot){
    let data = snapshot.val();
    newsList.push(data);
    console.log('Pushing');
    state.setState({newsList: newsList});
  })
}

export const newArticle = obj => {
  database.ref('news/').push(obj);
}

export const takeCredits = (uid, credits) => {
  console.log('Taking credits..', credits);

  database.ref('users/' + uid + '/credits').once('value', function(snapshot){
    let currentCredits = snapshot.val();

    let newBalance = currentCredits - credits;

    if(newBalance <= 0){
      console.log('You cannot afford this');
    } else {
      console.log('New balance: ', newBalance);
      return setCredits(uid, newBalance);
    }

  })
}

export const editUser = (uid, newUser) => {
  database.ref('users/'+uid).set(newUser);
}

export const updateUser = (uid, state) => {
  console.log('Starting listener on user..');
  return database.ref('users/').on('child_changed', function(snapshot){
    console.log('Updating user..');
    let data = snapshot.val();
    let key = snapshot.key;

    if(key === uid){
      console.log('Updated user straight from database: ', data);
      state.setState({user: data});
    }
  })
}

export const updateHighscores = state => {
  database.ref('users/').on('child_changed', snapshot => {
    state.updateUserList();
  });
}

export const stopUpdatingHighscores = () => {
  database.ref('users/').off();
}
