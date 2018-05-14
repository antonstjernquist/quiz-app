import * as auth from "./auth.js";
import * as firebase from "./firebase.js";
import * as database from "./database.js";

Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
  const value = this.getItem(key);
  return value && JSON.parse(value);
};

Storage.prototype.incrementTransaction = function(key, incrementAmount) {
      let item = Number(localStorage.getItem(key));
      const newVal = item + incrementAmount;
      localStorage.setItem(key, newVal);

      console.log(localStorage.getItem(key));
};

export { auth, firebase, database };
