import {observable, action} from "mobx"
 
class authStore {

    //***********Observables***********//
    @observable currentUser = undefined;

    //***********Actions***********//
    @action 
    signIn(user){
        this.currentUser = user;
    }
    @action 
    signOut(){
        this.currentUser = undefined;
        fetch('/api/users/signout')
    }
    @action 
    pullUser(){
        var self = this;
        fetch('/api/users/user')
        .then(response => response.text())
        .then(user => {
            if (user === "")
                self.currentUser = undefined;
            else
                self.currentUser = user;
        })
        .catch(self.currentUser = undefined)
    }
}

var store = new authStore;
export default store;

