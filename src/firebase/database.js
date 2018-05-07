import { database } from './firebase.js';


/* Databse functions */
export const logStuff = () => {
  console.log('I log stuff :)');
}

export const addQuestion = (questionObj) => {
  database.ref('questions/'+ questionObj.category).push(questionObj);
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
