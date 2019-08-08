import {autorun, observable, action, computed} from "mobx"
 
function range(start, end) {
    //console.log(start, end);
    let size = end - start + 1;
    if (size < 1)
        return [];
    return [...Array(size).keys()].map(i => i + start);
}

class userStore {

    //***********Observables***********//
    @observable users = [];
    @observable currentpage = 1;
    @observable loading = false;
    @observable userForDelete = undefined;
    

    //***********Computed***********//
    @computed get pageUsers(){
        return this.users.slice((this.currentpage-1)*5, this.currentpage*5 )
    }
    @computed get maxPage(){
        return Math.ceil(this.users.length / 5);
    }
    @computed get pageRange(){
        if (this.currentpage < 5)
            if (this.maxPage > 5)
                return range(1,5);
            else
            {
                console.log("max", this.maxPage);
                return range(1,this.maxPage);
            }
        else
        {
            if (this.currentpage == this.maxPage)
                return range(this.currentpage - 4,this.currentpage);
            else
                return range(this.currentpage - 3,this.currentpage + 1);
        }


    }

    //***********Actions***********//
    @action 
    getUsers(){
        var self = this;
        this.loading = true;
        this.users = [];
        fetch('/api/users/usersList')
        .then(res => res.json())
        .then(res => self.users = res)
        .then(() => this.reloading = false)        
        .catch(err => console.log(err))
        .then(() => this.loading = false)        

    }
    @action 
    deleteUser(){
        const userForDelete = this.userForDelete;
        fetch('/api/users/deleteUser', {
            method: 'POST', 
            body: JSON.stringify({"id": userForDelete}), 
            headers:{
              'Content-Type': 'application/json'
            }
        })
    }

    @action 
    next(){
        if (this.currentpage < this.maxPage)
            this.currentpage += 1;  
    }
    @action 
    previous(){
        if (this.currentpage > 1)
            this.currentpage -= 1;  
    }
}

var store = new userStore;
export default store;
autorun(() => {console.log(store.currentpage, store.pageRange)})
