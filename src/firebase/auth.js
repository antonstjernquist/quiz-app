import { auth, providerData } from './firebase.js';


export const doLogInWithGoogle = (state) => {
  return auth.signInWithPopup(providerData.google);
}

export const logStuff = () => {
  console.log('I log stuff :)');
}

// Sign out
export const doSignOut = () => {
  auth.signOut();
  console.log('Logged out!');
}
