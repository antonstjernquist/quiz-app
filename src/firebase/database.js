import { database } from './firebase.js';


/* Databse functions */
export const logStuff = () => {
  console.log('I log stuff :)');
}

export const addQuestion = (questionObj) => {
  database.ref('questions/').push(questionObj);
}
