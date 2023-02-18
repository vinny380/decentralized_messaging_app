import GUN from "https://cdn.skypack.dev/gun";
import "https://cdn.jsdelivr.net/npm/gun/sea.js";

let gun = new GUN();
let user = gun.user().recall({sessionStorage: false}); 

/***
 @param {string} alias - Username or Alias which can be used to find a user.
 @param {string} pass - Passphrase that will be extended with PBKDF2 to make it a secure way to login.
 @param {function} cb (function) - Callback that is to be called upon creation of the user.
 @param {object} opt - Option Object containing options for creation. (In gun options are added at end of syntax. opt is rarely used, hence is added at the end.)
  */
function createUser(alias, pass, cb, opt){
    try{
        user.create(alias, pass, opt);
        if (user.is) {
            alert('You are logged in');
         } else {
            alert('You are not logged in');
         }
    }
    catch(ex){
        alert(ex)
    }
}
// gun.get("~@alias").once(callback)

/** 
@param {string} alias - Username or Alias which can be used to find a user.
@param {string}pass  - Passphrase for the user
@param {object}pair  - Object containing the key pair of the user
@param {userReference}cb - Callback that is to be called upon authentication of the user.
@param {object}opt  - Option Object containing options for authentication. (In gun options are added at end of syntax. opt is rarely used, hence is added at the end.)
@param {object}opt  {change:'newPassword'} can be used to change user's password to 'newPassword'
*/
function authUser(alias, pass, cb, opt){
    try{
        user.auth(alias, pass, cb, opt)
        if (user.is) {
            alert('You are logged in');
         } else {
            alert('You are not logged in');
         }
    }
    catch(ex){
        alert(ex)
    }
}

let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');

document.getElementById('signup').addEventListener('click', () => {
    createUser(username.value, password.value)
})
document.getElementById('login').addEventListener('click', () => {
    authUser(username.value, password.value)
})