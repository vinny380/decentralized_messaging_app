import GUN from "https://cdn.skypack.dev/gun";
import "https://cdn.jsdelivr.net/npm/gun/sea.js";

var gun = new GUN(['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun']);
let user = gun.user().recall({sessionStorage: true}); 
let ack_value;
let username;

document.getElementById('submit').hidden=true;
document.getElementById('read').hidden=true;
document.getElementById('login').hidden=false;
document.getElementById('signup').hidden=false;
document.getElementById('message').hidden=true;

/***
 @param {string} alias - Username or Alias which can be used to find a user.
 @param {string} pass - Passphrase that will be extended with PBKDF2 to make it a secure way to login.
 @param {function} cb (function) - Callback that is to be called upon creation of the user.
 @param {object} opt - Option Object containing options for creation. (In gun options are added at end of syntax. opt is rarely used, hence is added at the end.)
  */
function createUser(alias, pass, cb, opt){
    try{
        user.create(alias, pass, function(ack){
        if (user.is) {
            alert(`Account create at ${ack.pub}`);
         } else {
            alert('You are not logged in');
         }
        });
    }
    catch(ex){
        alert(ex)
    }
}


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
        user.auth(alias, pass, (ack) => {
            ack_value = ack
        })
        if (checkUserStatus()) {
            alert('You are logged in');
            document.getElementById('submit').hidden=false;
            document.getElementById('read').hidden=false;
            document.getElementById('login').hidden=true;
            document.getElementById('signup').hidden=true;
            document.getElementById('username').hidden=true;
            document.getElementById('password').hidden=true;
            document.getElementById('message').hidden=false;
            username = alias;

         } else {
            alert('You are not logged in');
            document.getElementById('submit').hidden=true;
            document.getElementById('read').hidden=true;
            document.getElementById('login').hidden=false;
            document.getElementById('signup').hidden=false;
         }
    }
    catch(ex){
        alert(ex)
    }
}

function checkUserStatus(){
    if (user.is) {
        return true;
     } else {
        return false;
     }
}

async function submitData(){
    await ack_value;
    if (checkUserStatus()){
        gun.get("pub/" + ack_value.pub).put({username: `${username} says: ${document.getElementById('message').value}`});
    }
    else{
        alert('Submit Data broke')
    }
}

async function readData(){
    await ack_value;
    if (checkUserStatus()){
        gun.get("pub/" + ack_value.pub).get('username').once((val, key) => {
            alert(`READ:${key} ${val}`)
            }
        )
    }
    else{
        alert('Read Data broke')
    }
}


function signOut(){
    username = ''
    location.reload();
}

let username_div = document.getElementById('username');
let password = document.getElementById('password');

document.getElementById('signup').addEventListener('click', () => {
    createUser(username_div.value, password.value)
})
document.getElementById('login').addEventListener('click', () => {
    authUser(username_div.value, password.value)
})

document.getElementById('submit').addEventListener('click', () => {
    submitData();
})

document.getElementById('read').addEventListener('click', () => {
    readData();
})
