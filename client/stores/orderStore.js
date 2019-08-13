import {autorun, observable, action, computed} from "mobx"
 
function range(start, end) {
    //console.log(start, end);
    let size = end - start + 1;
    if (size < 1)
        return [];
    return [...Array(size).keys()].map(i => i + start);
}

class orderStore {

    //***********Observables***********//
    @observable orders = [];
    @observable search = "";
    @observable currentpage = 1;
    @observable loading = false;    

    //***********Computed***********//
    @computed get filteredOrders(){
        var self = this;
        let filtered = this.orders.filter(function (order) {
            return order.user.includes(self.search) ||
            order.game.includes(self.search) ||
            order.Status.includes(self.search)
        })
        return filtered;
    }

    @computed get pageOrders(){
        return this.filteredOrders.slice((this.currentpage-1)*5, this.currentpage*5 )
    }
    @computed get maxPage(){
        return Math.ceil(this.filteredOrders.length / 5);
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
    getOrders(){
        var self = this;
        this.loading = true;
        this.users = [];
        fetch('/api/orders/ordersList')
        .then(res => res.json())
        .then(res => self.orders = res)
        .catch(err => console.log(err))
        .finally(() => this.loading = false)        

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

var store = new orderStore;
export default store;
