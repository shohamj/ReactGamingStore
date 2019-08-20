import {autorun, observable, action} from "mobx"

class forgotPasswordStore {

    //***********Observables***********//
    @observable Email = "";
    @observable Loading = false;
    @observable LoadingMessage = "";
    @observable Errors = {};
    @observable Message = "";
    @observable MessageTitle = "";
    @observable MessageType = "";
    @observable HasMessage = false;
    //***********Actions***********//


    @action
    submitForm(data){
        this.Loading = true;
        this.Errors = {};
        this.LoadingMessage = "Sending Email...";
        console.log("data and data", data.email);
        //return {data:'yes'};
        return fetch('/api/forgot', {
          method: 'POST', 
          body: JSON.stringify({email: data.email}), 
          headers:{
            'Content-Type': 'application/json'
          }
        }).catch(err => console.log(err))
          .then(function(res){
          if (res.status == 200)
            throw 'Success';
          return res;
        });
    }
}

var store = new forgotPasswordStore;
export default store;

// autorun(() => {console.log(store.Username, store.Email, store.Password, store.ConfirmPassword, store.Errors.username)})