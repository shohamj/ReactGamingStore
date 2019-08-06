import {autorun, observable, action, computed} from "mobx"
 
class userStore {

    //***********Observables***********//
    @observable users = []

    //***********Actions***********//
    @action 
    getUsers(){
        var self = this;
        fetch('/api/users/usersList')
        .then(res => res.json())
        .then(res => self.users = res)
        .then(res =>console.log(self.users))        
        .catch(err => console.log(err))
    }
    
}

var store = new userStore;
export default store;
autorun(() => {console.log(store.price)})
