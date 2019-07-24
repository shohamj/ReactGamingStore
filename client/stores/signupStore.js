import {autorun, observable, action} from "mobx"
import {CreateKeyFromPublic, Encrypt} from '../../shared/encryption/RSAUtills'

class signupStore {

    //***********Observables***********//
    @observable Username = "";
    @observable Email = "";
    @observable Password = "";
    @observable ConfirmPassword = "";
    @observable Errors = {};

    //***********Actions***********//
    @action
    submitForm(){
        this.Errors = {};
        console.log(this.Password === this.ConfirmPassword)
        return fetch('api/users/key')
        .then(response => response.text())
        .then(publicKeyString => CreateKeyFromPublic(publicKeyString))
        .then(key => { return {"username": this.Username,
               "email": this.Email,
               "password": Encrypt(this.Password, key),
               "confirmPassword": Encrypt(this.ConfirmPassword, key)}})
        .then(data => fetch('/api/users/signup', {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json'
            }
          }))
          .then(function(response) {
              if (response.status == 200)
                throw "Status is 200";
            return response.json();
          })   
    }
}

var store = new signupStore;
export default store;

// autorun(() => {console.log(store.Username, store.Email, store.Password, store.ConfirmPassword, store.Errors.username)})