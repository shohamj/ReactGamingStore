import {autorun, observable, action, computed} from "mobx"
import io from 'socket.io-client';
var socket = io(window.location.origin);


class blogStore {

    //***********Observables***********//
    @observable posts = [
        {_id:1, author: "Shoham", image:"/images/blog/blog-04.jpg", date: Date.now(), title:"8 Interesting Facts About Shaving Unwilling Cats", categories:["Cats"], text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
    ];
    @observable search = "";
    @observable selectedCategory = "";
    @observable loading = false;

    

    //***********Computed***********//
    @computed get filteredPosts(){
        var self = this;
        let filtered = this.posts.filter(function (post) {
            return (post.title.includes(self.search) || post.text.includes(self.search)) &&
            (self.selectedCategory=='' || post.categories.includes(self.selectedCategory))
        })
        return filtered;
    }


    // //***********Actions***********//
    @action 
    getPosts(silent=false){
        var self = this;
        this.loading = true && !silent;
        this.users = [];
        fetch('/api/blog/postsList')
        .then(res => res.json())
        .then(res => self.posts = res)
        .catch(err => console.log(err))
        .then(() => this.loading = false)        
    }

    @action 
    postAdded(){
        socket.emit("new post");
    }

   
}

var store = new blogStore;
socket.on('reload posts', function(data){
    store.getPosts(true);
})
export default store;
// autorun(() => {console.log(store.currentpage, store.pageRange)})
