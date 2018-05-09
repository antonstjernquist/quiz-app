import { auth, providerData} from './firebase.js';
import { database } from '../firebase';


export const doLogInWithGoogle = (state) => {
  return auth.signInWithPopup(providerData.google);
}

export const doLogInWithFacebook = (state) => {
  return auth.signInWithPopup(providerData.facebook);
}

export const onAuthStateChanged = (state) => {
  return auth.onAuthStateChanged(function(user){

    if(user){

      // Try to retrieve the user from the databse
      database.retrieveUser(user.uid).then(function (result){
        let data = result.val();
        if(data){
          console.log('Setting user from database');
          state.setState({user: data});
        } else {
          console.log('Setting user directly from auth info');
          state.setState({user: user});
        }
        console.log('result is: ', data);
        state.setState({loading: false});

        /* Turn on listener for creditUpdates on this UID */
        database.updateUser(user.uid, state);
      });
    } else {
      state.setState({loading: false});
      state.setState({user: null})
      state.setState({changeUsername: false})
    }


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
