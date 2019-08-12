import {observable, action, autorun, computed} from "mobx"
 
class cartStore {

    //***********Observables***********//
    @observable Items = [];
    @observable loading = false;

    @computed get overAllPrice(){
        let sum = 0;
        this.Items.forEach(function (item, index) {
            sum += item.price * item.amount;
        });
        console.log(sum);
        return sum;
    }

    @computed get overAllAmount(){
        let sum = 0;
        this.Items.forEach(function (item, index) {
            sum += item.amount;
        });
        return sum;
    }
    //***********Actions***********//

    @action 
    pullCart(){
        var self = this;
        fetch('/api/games/getCart')
        .then(response => response.json())
        .then(items => {
            self.Items = items;
        })
        .catch(err => console.log(err))
    }
}

var store = new cartStore;
export default store;

