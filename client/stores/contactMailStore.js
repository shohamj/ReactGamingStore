import {autorun, observable, action} from "mobx"
import {CreateKeyFromPublic, Encrypt} from '../../shared/encryption/RSAUtills'


class contactMailStore {

    //***********Observables***********//
    @observable Email = "";
    @observable EmailMessage = "";
    @observable Loading = false;
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
      var that = this;
      return fetch('/api/contact/sendEmail', {
        method: 'POST', 
        body: JSON.stringify({email: data.email, emailMessage: data.emailMessage}), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).catch(err => console.log(err))
        .then(function(res){
          console.log("status", res.status);
        if (res.status == 200)
          throw 'Success';
        return res;
      });
  }
}

var store = new contactMailStore;
export default store;

// autorun(() => {console.log(store.Username, store.Email, store.Password, store.ConfirmPassword, store.Errors.username)})