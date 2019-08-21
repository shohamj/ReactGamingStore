import {autorun, observable, action, computed} from "mobx"
 


class blogStore {

    //***********Observables***********//
    @observable posts = [
        {_id:1, author: "Shoham", image:"/images/blog/blog-04.jpg", date: Date.now(), title:"8 Interesting Facts About Shaving Unwilling Cats", categories:["Cats"], text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
    ];
    @observable search = "";
    @observable selectedCategory = "";
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
