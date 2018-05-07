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

export const checkName = () => {
  return database.ref('users/').once('value');
}

export const createUser = user => {
  database.ref('users/' + user.uid).set(user);
}

export const retrieveUser = uid => {
  return database.ref('users/' + uid).once('value');
}
