import {observable} from "mobx"
 
class navbarStore {
    @observable showSidebar = false;
}

var store = new navbarStore;
export default store;
