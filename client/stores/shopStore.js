import {autorun, observable, action} from "mobx"
 
class shopStore {

    //***********Observables***********//
    @observable isSearchPanelOpen = false;
    @observable isFiltersPanelOpen = false;

    //***********Actions***********//
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
autorun(() => {console.log(store.isSearchPanelOpen)})
