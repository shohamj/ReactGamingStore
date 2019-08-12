import {autorun, observable, action, computed} from "mobx"
 
function range(start, end) {
    //console.log(start, end);
    let size = end - start + 1;
    if (size < 1)
        return [];
    return [...Array(size).keys()].map(i => i + start);
}

class shopStore {

    //***********Observables***********//
    @observable isSearchPanelOpen = false;
    @observable isFiltersPanelOpen = false;
    @observable search = "";
    @observable sort = "Popularity";
    @observable category = "";
    @observable genre = "";
    @observable platform = "";
    @observable price = [0];
    @observable games = [];
    @observable currentpage = 1;
    @observable loading = false;


    // @observable games = [
    // {id:"507f191e810c19729de860ea", name:"Enslaved", price:13.99, image:"enslaved/main.png", genre:["Action", "Indie"], platform:["PC"], sold:15, released: new Date(), added: new Date(), controller: false},
    // {id:"507f191e810c19729de860eb", name:"Another Game", price:39.99, image:"enslaved/main.png", genre:["Action"], platform:["PC"], sold:5, released: new Date(), added: new Date(), controller: false},
    // {id:"507f191e810c19729de860ec", name:"I don't know", price:16.99, image:"enslaved/main.png", genre:["Adventure", "Indie"], platform:["PC"], sold:5, released: new Date(), added: new Date(), controller: false},
    // {id:"507f191e810c19729de860ed", name:"Please", price:13.99, image:"enslaved/main.png", genre:["Indie"], platform:["PC"], sold:5, released: new Date(), added: new Date(), controller: false},
    // {id:"507f191e810c19729de860ee", name:"Help", price:39.99, image:"enslaved/main.png", genre:["Indie"], platform:["PC"], sold:3, released: new Date(), added: new Date(), controller: false},
    // {id:"507f191e810c19729de860ef", name:"Me", price:16.99, image:"enslaved/main.png", genre:["Action", "Indie"], platform:["PC", "MAC"], sold:5, released: new Date(), added: new Date(), controller: false},
    // {id:"507f191e810c19729de860eg", name:"I'm", price:13.99, image:"enslaved/main.png", genre:["Action", "Indie"], platform:["PC"], sold:1, released: new Date(), added: new Date(), controller: true},
    // {id:"507f191e810c19729de860eh", name:"Trying To", price:39.99, image:"enslaved/main.png", genre:["Action", "Indie"], platform:["PC"], sold:5, released: new Date(), added: new Date(), controller: false},
    // {id:"507f191e810c19729de860ei", name:"End It All", price:16.99, image:"enslaved/main.png", genre:["Action"], platform:["PC"], sold:5, released: new Date(), added: new Date(), controller: false},
    // {id:"507f191e810c19729de860ei", name:"End It All", price:16.99, image:"enslaved/main.png", genre:["Action"], platform:["PC"], sold:8, released: new Date(), added: new Date(), controller: false},
    // {id:"507f191e810c19729de860ei", name:"End It All", price:16.99, image:"enslaved/main.png", genre:["Action"], platform:["PC"], sold:5, released: new Date(), added: new Date(), controller: false},
    // {id:"507f191e810c19729de860ei", name:"End It All", price:16.99, image:"enslaved/main.png", genre:["Action"], platform:["PC"], sold:100, released: new Date(), added: new Date(), controller: false},
    // {id:"507f191e810c19729de860ei", name:"End It All", price:16.99, image:"enslaved/main.png", genre:["Action"], platform:["PC"], sold:11, released: new Date(), added: new Date(), controller: false},
    // {id:"507f191e810c19729de860ei", name:"End It All", price:16.99, image:"enslaved/main.png", genre:["Action"], platform:["PC"], sold:5, released: new Date(), added: new Date(), controller: false},
    // {id:"507f191e810c19729de860ei", name:"End It All", price:16.99, image:"enslaved/main.png", genre:["Action"], platform:["PC"], sold:2, released: new Date(), added: new Date(), controller: false},
    // {id:"507f191e810c19729de860ei", name:"End It All", price:16.99, image:"enslaved/main.png", genre:["Action"], platform:["PC"], sold:2, released: new Date(), added: new Date(), controller: false},
    // {id:"507f191e810c19729de860ei", name:"End It All", price:16.99, image:"enslaved/main.png", genre:["Action"], platform:["PC"], sold:0, released: new Date(), added: new Date(), controller: false},
    // ];

    @computed get pageGames(){
        return this.filteredGames.slice((this.currentpage-1)*5, this.currentpage*5 )
    }
    @computed get maxPage(){
        return Math.ceil(this.filteredGames.length / 5);
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

    @computed get filteredGames(){
        var self = this;
        let categorized = this.games;
        if (this.category == "top_selling"){
            categorized.slice().sort(function(a,b){
                b.sold - a.sold;
            })
            categorized = categorized.slice(0, 10);
        }
        let filtered = categorized.filter(function (game) {
            return game.name.includes(self.search) &&
            (self.genre == "" || game.genre.includes(self.genre)) &&
            (game.price > self.price[0] && (self.price.length < 2 || game.price <= self.price[1])) &&
            (self.platform == "" || game.platform.includes(self.platform)) &&
            (self.category != "recent" || (new Date() - Date.parse(game.added)) < 60 * 60 * 24 * 5 * 1000) &&
            (self.category != "controller" || game.controller)
        });
        filtered.slice().sort(function (a,b){
            if(self.sort == "Popularity"){
                if( a.sold < b.sold )
                    return 1;
                if ( a.sold == b.sold )
                    return 0;
                return -1;
            }
            if(self.sort == "Newest to Oldest"){
                if( Date.parse(a.released) < Date.parse(b.released) )
                    return 1;
                if ( Date.parse(a.released) == Date.parse(b.released) )
                    return 0;
                return -1;
            }
            if(self.sort == "Oldest to Newest"){
                if( Date.parse(a.released) > Date.parse(b.released) )
                    return 1;
                if ( Date.parse(a.released) == Date.parse(b.released) )
                    return 0;
                return -1;
            }
            if(self.sort == "Low to High"){
                if( a.price > b.price )
                    return 1;
                if ( a.price == b.price )
                    return 0;
                return -1;
            }
            if(self.sort == "High to Low"){
                if( a.price < b.price )
                    return 1;
                if ( a.price == b.price )
                    return 0;
                return -1;
            }
            return true;
        })
        return filtered;
    }
    

    //***********Actions***********//
    @action 
    getGames(){
        var self = this;
        this.loading = true;
        fetch('/api/games/gamesList')
        .then(res => res.json())
        .then(res => self.games = res)
        .catch(err => console.log(err))
        .finally(() => this.loading=false)
    }
    @action 
    toggleSearchPanel(){
        this.isSearchPanelOpen = !this.isSearchPanelOpen;
        this.isFiltersPanelOpen = false;
    }

    @action 
    toggleFiltersPanel(){
        this.isSearchPanelOpen = false;
        this.isFiltersPanelOpen = !this.isFiltersPanelOpen;
    }

}

var store = new shopStore;
export default store;
autorun(() => {console.log(store.price)})
