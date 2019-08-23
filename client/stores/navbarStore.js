import {autorun, observable, action} from "mobx"
 
class navbarStore {

    //***********Observables***********//
    @observable selectedTab = "Home";
    @observable showSidebar = false;
    @observable showCartBar = false;
    @observable showMobileMenu = false;

    //***********Actions***********//
    @action 
    setSelectedTab(tab){
        this.selectedTab = tab
    }
    @action 
    setShowSidebar(show){
        this.showSidebar = show
    }
}

var store = new navbarStore;
export default store;

autorun(() => {console.log(store.showCartBar)})