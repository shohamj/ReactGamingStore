import {autorun, observable, action} from "mobx"
import pbkdf2_sha256_promise from '../../shared/encryption/pbkdf2'

class signinStore {

    //***********Observables***********//
    @observable Username = "";
    @observable Password = "";
    @observable Message = "";
    @observable MessageTitle = "";
    @observable MessageType = "";
    @observable HasMessage = false;
    @observable Loading = false;    
    @observable Errors = {};

    //***********Actions***********//
    @action
    submitForm(){
        this.Errors = {};
        var data = {username: this.Username, password:this.Password};
        var challenge = "";
        var Loading = this.Loading = true;
        return fetch('/api/users/challenge_response', {
          method: 'POST', 
          body: JSON.stringify({username:this.Username}), 
          headers:{
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(json => {challenge=json.challenge;
          return pbkdf2_sha256_promise(data.password, json.salt)})
        .then(hash => pbkdf2_sha256_promise(hash, challenge))
        .then(res => fetch('/api/users/signin', {
            method: 'POST', 
            body: JSON.stringify({"username": data.username,"password": res}), 
            headers:{
              'Content-Type': 'application/json'
            }
        }))
        .catch(err => {Loading = false; return {general:"Server error: " + err}}) 
        .then(function(response) {
            Loading = false;
              if (response.status == 200)
                throw data.username;
            return response.json();
        })
           
    }
}

var store = new signinStore;
export default store;

// autorun(() => {console.log(store.Username, store.Email, store.Password, store.ConfirmPassword, store.Errors.username)})