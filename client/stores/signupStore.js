import {autorun, observable, action} from "mobx"
import signupValidator from '../../shared/validation/signupValidation.js'

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
        let data = {"username": this.Username,
                   "email": this.Email,
                   "password": this.Password,
                   "confirmPassword": this.ConfirmPassword};
        return fetch('/api/users/signup', {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(function(response) {
              if (response.status == 200)
                throw "Status is 200";
            return response.json();
          })   
    }
}

var store = new signupStore;
export default store;

// autorun(() => {console.log(store.Username, store.Email, store.Password, store.ConfirmPassword, store.Errors.username)})