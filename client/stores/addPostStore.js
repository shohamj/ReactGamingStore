import {autorun, observable, action} from "mobx"

class addPostStore {

    //***********Observables***********//
    @observable Author = '';
    @observable Image = '';
    @observable Title = '';
    @observable Text = '';
    @observable Categories = [];
    @observable Loading = false;
    @observable Errors = {};
    //***********Actions***********//
  
    @action
    submitForm(){
        this.Loading = true;
        this.Errors = {};
        let data = {
            author: this.Author,
            image: this.Image[0],
            categories: JSON.stringify(this.Categories.map((elem) => elem.value)),
            text: this.Text,
            title: this.Title,
        }
        var form_data = new FormData();

        for ( var key in data ) {
            form_data.append(key, data[key]);
        }
        return fetch('/api/blog/addPost', {
            method: 'POST', 
            body: form_data, 
        })
        .catch(err => {return {general:"Server error: " + err}}) 
        .then(function(response) {
          if (response.status == 200)
            throw "Status is 200";
          return response.json();
        })

    }
}

var store = new addPostStore;
export default store;

// autorun(() => {console.log(store.Image, store.Release, store.Genres)})