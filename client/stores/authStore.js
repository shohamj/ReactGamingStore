import {observable, action, autorun} from "mobx"
 
class authStore {

    //***********Observables***********//
    @observable currentUser = undefined;
    @observable role = undefined;
    @observable loading = false;

    //***********Actions***********//
    @action 
    signIn(user){
        console.log(user);
        user = JSON.parse(user);
        this.currentUser = user.username;
        this.role = user.role;
        this.loading = false;
        console.log(this.currentUser);
    }
    @action 
    signOut(){
        this.currentUser = undefined;
        this.role = undefined;
        fetch('/api/users/signout')
    }
    @action 
    pullUser(){
        var self = this;
        this.loading = true;
        fetch('/api/users/user')
        .then(response => response.text())
        .then(user => {
           self.signIn(user);
        })
        .catch(()=>self.signIn({}))
    }
}

var store = new authStore;
autorun(() => {console.log(store.currentUser, store.loading )})
export default store;

