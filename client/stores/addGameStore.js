import {autorun, observable, action} from "mobx"

class addGameStore {

    //***********Observables***********//
    @observable Name = "";
    @observable Image = '';
    @observable Genres = [];
    @observable Platforms = [];
    @observable Price = 0;
    @observable Release = (new Date()).toISOString().split('T')[0];
    @observable Controller = false;
    @observable Loading = false;
    @observable Errors = {};
    @observable Message = "";
    @observable MessageTitle = "";
    @observable MessageType = "";
    @observable HasMessage = false;
    //***********Actions***********//
  
    @action
    submitForm(){
        this.Loading = true;
        this.Errors = {};
        let data = {
            name: this.Name,
            image: this.Image[0],
            genres: this.Genres,
            platforms: this.Platforms,
            price: this.Price,
            release: this.Release,
            controller: this.Controller,
        }
        var form_data = new FormData();

        for ( var key in data ) {
            form_data.append(key, data[key]);
        }
        return fetch('/api/games/addGame', {
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

var store = new addGameStore;
export default store;

autorun(() => {console.log(store.Image, store.Release, store.Genres)})