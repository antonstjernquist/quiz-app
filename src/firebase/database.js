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

export const setCredits = (uid, credits) => {
  console.log('Setting balance to: ' + credits);
  return database.ref('users/' + uid).update({credits: Number(credits)});
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

export const updateUser = (uid, state) => {
  database.ref('users/' + uid).on('value', function(snapshot){
    let key = snapshot.key;
    let data = snapshot.val();

    state.setState({user: data});


  })
}
