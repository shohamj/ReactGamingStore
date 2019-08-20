import {autorun, observable, action} from "mobx"
import {CreateKeyFromPublic, Encrypt} from '../../shared/encryption/RSAUtills'

class signupStore {

    //***********Observables***********//
    @observable Username = "";
    @observable Email = "";
    @observable Password = "";
    @observable ConfirmPassword = "";
    @observable RoleLabel = "Customer";
    @observable RoleValue = "customer";
    @observable Loading = false;
    @observable LoadingMessage = "";
    @observable Errors = {};
    @observable Message = "";
    @observable MessageTitle = "";
    @observable MessageType = "";
    @observable HasMessage = false;
    @observable captcha= "";
    //***********Actions***********//
  
    @action
    submitForm(){
        var self = this;
        this.Loading = true;
        this.Errors = {};
        console.log(this.Password === this.ConfirmPassword)
        this.LoadingMessage = "Encrypting password";
        return fetch('/api/users/key')
        .then(response => response.text())
        .then(publicKeyString => CreateKeyFromPublic(publicKeyString))
        .then(key => { return {"username": this.Username,
               "email": this.Email,
               "role": this.RoleValue,
               "password": Encrypt(this.Password, key),
               "confirmPassword": Encrypt(this.ConfirmPassword, key),
               "captcha": this.captcha
              }})
        .then(data => {this.LoadingMessage = "Sending sign-up info to server"; return data})
        .then(data => fetch('/api/users/signup', {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json'
            }
        }))
        .catch(err => {return {general:"Server error: " + err}}) 
        .then(function(response) {
          if (response.status == 200){
            self.captcha= "";
            throw "Status is 200";
          }


          return response.json();
        })

    }
}

var store = new signupStore;
export default store;

// autorun(() => {console.log(store.Username, store.Email, store.Password, store.ConfirmPassword, store.Errors.username)})