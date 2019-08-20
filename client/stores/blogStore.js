import {autorun, observable, action, computed} from "mobx"
 


class blogStore {

    //***********Observables***********//
    @observable posts = [
        {author: "Shoham", image:"/images/blog/blog-04.jpg", date: Date.now(), title:"8 Interesting Facts About Shaving Unwilling Cats", categories:["Cats"], text:""},
    ];
    @observable search = "";
    @observable loading = false;
    

    //***********Computed***********//
    @computed get filteredUsers(){
        var self = this;
        let filtered = this.users.filter(function (user) {
            return user.username.includes(self.search) ||
            user.email.includes(self.search) ||
            user.role.includes(self.search); 
        })
        return filtered;
    }

   

    // //***********Actions***********//
    // @action 
    // getUsers(){
    //     var self = this;
    //     this.loading = true;
    //     this.users = [];
    //     fetch('/api/users/usersList')
    //     .then(res => res.json())
    //     .then(res => self.users = res)
    //     .then(() => this.reloading = false)        
    //     .catch(err => console.log(err))
    //     .then(() => this.loading = false)        

    // }
    // @action 
    // deleteUser(){
    //     const userForDelete = this.userForDelete;
    //     fetch('/api/users/deleteUser', {
    //         method: 'POST', 
    //         body: JSON.stringify({"id": userForDelete}), 
    //         headers:{
    //           'Content-Type': 'application/json'
    //         }
    //     })
    // }

    // @action 
    // next(){
    //     if (this.currentpage < this.maxPage)
    //         this.currentpage += 1;  
    // }
    // @action 
    // previous(){
    //     if (this.currentpage > 1)
    //         this.currentpage -= 1;  
    // }
}

var store = new blogStore;
export default store;
// autorun(() => {console.log(store.currentpage, store.pageRange)})
