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
        return this.round(sum);
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

    round(number){
        let num = Number(number);
        var roundedString = num.toFixed(2);
        var rounded = Number(roundedString); 
        return rounded;
    }
}

var store = new cartStore;
export default store;

