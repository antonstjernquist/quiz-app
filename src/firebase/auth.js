import { auth, providerData } from './firebase.js';


export const doLogInWithGoogle = (state) => {
  return auth.signInWithPopup(providerData.google);
}

export const doLogInWithFacebook = (state) => {
  return auth.signInWithPopup(providerData.facebook);
}

export const onAuthStateChanged = (state) => {
  return auth.onAuthStateChanged(function(user){

    if(user){
      state.setState({loggedin: true});
    } else {
      state.setState({loggedin: false});
    }
    state.setState({user: user});

  });
}

export const logStuff = () => {
  console.log('I log stuff :)');
}

// Sign out
export const doSignOut = () => {
  auth.signOut();
  console.log('Logged out!');
}
