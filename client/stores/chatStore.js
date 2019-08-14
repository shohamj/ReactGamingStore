import {observable, action, autorun, computed} from "mobx"
 
class chatStore {

    //***********Observables***********//
    @observable user = {_id: "4",name: "Shoham Jacobsen",isOnline: false, image: "http://emilcarlsson.se/assets/mikeross.png"}

    @observable users = [
        {_id: "1",name: "Harvey Specter", isOnline: true, image: "http://emilcarlsson.se/assets/harveyspecter.png"},
        {_id: "2",name: "Jonathan Sidwell", isOnline: false, image: "http://emilcarlsson.se/assets/jonathansidwell.png"},
        {_id: "3",name: "Rachel Zane", isOnline: false, image: "http://emilcarlsson.se/assets/rachelzane.png"},
        {_id: "4",name: "Shoham Jacobsen",isOnline: false, image: "http://emilcarlsson.se/assets/mikeross.png"}
    ];

    @observable groups = [
        {_id: "1",name: "Group 1", image: "http://emilcarlsson.se/assets/harveyspecter.png"},
        {_id: "2",name: "Group 2", image: "http://emilcarlsson.se/assets/jonathansidwell.png"},
        {_id: "3",name: "Group 3", image: "http://emilcarlsson.se/assets/rachelzane.png"},
        {_id: "4",name: "Group 4", image: "http://emilcarlsson.se/assets/mikeross.png"}
    ];

    @observable messages = [
        {_id: "1", isLiked: true,      data: "Hey1" , from: "4", to: "1", type:"user", at: (new Date).toISOString()},
        {_id: "2", isLiked: undefined, data: "Hey2" , from: "1", to: "1", type:"group", at: (new Date).toISOString()},
        {_id: "3", isLiked: undefined, data: "Hey3" , from: "4", to: "1", type:"group", at: (new Date).toISOString()},
        {_id: "4", isLiked: undefined, data: "Not hey" , from: "3", to: "1", type:"user", at: (new Date).toISOString()},
        {_id: "5", isLiked: undefined, data: "Hello" , from: "2", to: "2", type:"group", at: (new Date).toISOString()},
        {_id: "6", isLiked: undefined, data: "Its me" , from: "2", to: "3", type:"group", at: (new Date).toISOString()},
    ];

    @observable activeIndex = 0;
    @observable active = {type: "user", _id: this.users[0]._id};
    @observable searchContacts = "";
    @observable searchMessages = "";
    @observable loading = false;

    //***********Computed***********//
    @computed get filteredUsers(){
        var self = this;
        let filtered = this.users.filter(function (user) {
            return user._id != self.user._id &&
            user.name.includes(self.searchContacts);
        });
        return filtered;
    }
    @computed get filteredGroups(){
        var self = this;
        let filtered = this.groups.filter(function (group) {
            return group.name.includes(self.searchContacts);
        });
        return filtered;
    }

    @computed get filteredMessages(){
        var self = this;
        let filtered = this.messages.filter(function (message) {
            return (message.type=="group" && self.active.type == "group" && message.to == self.active._id) ||
            (message.type=="user" && self.active.type == "user" && (message.from == self.active._id || message.from == self.user._id && message.to == self.active._id)) &&
            message.data.includes(self.searchMessages)
        });
        return filtered;
    }

    @computed get activeInfo(){
       if (this.active.type == "user"){
            var index = this.users.findIndex(x => x._id == this.active._id);
            if(index != -1)
            return this.users[index];
       }
       else if (this.active.type == "group"){
            var index = this.groups.findIndex(x => x._id == this.active._id);
            return this.groups[index];
        }
       
        return {};         
    }


    //***********Actions***********//
    @action 
    getLastMessage(type, id){
        var self = this;
        let filtered = this.messages.filter(function (message) {
            return (message.type=="group" && type == "group" && message.to == id) ||
            (message.type=="user" && type == "user" && (message.from == id || message.from == self.user._id && message.to == id))
        });
        var last = filtered.slice(-1)[0];
        if(last)
            return last.data;
        return "";
    }

    getNameById(id){
        var index = this.users.findIndex(x => x._id == id);
        if(index != -1)
            return this.users[index].name;
        return "User Not Found";
    }
    getImageById(id){
        var index = this.users.findIndex(x => x._id == id);
        if(index != -1)
            return this.users[index].image;
        return "Image Not Found";
    }
}

var store = new chatStore;
export default store;
autorun(() => {console.log(store.active._id)})
