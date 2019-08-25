import {observable, action, autorun, computed} from "mobx"
import io from 'socket.io-client';
var socket = io(window.location.origin);

class chatStore {

    //***********Observables***********//
    // @observable user = {_id: "4",name: "Shoham Jacobsen",isOnline: false, image: "http://emilcarlsson.se/assets/mikeross.png"}
    
    // @observable users = [
    //     {_id: "1",name: "Harvey Specter", isOnline: true, image: "http://emilcarlsson.se/assets/harveyspecter.png"},
    //     {_id: "2",name: "Jonathan Sidwell", isOnline: false, image: "http://emilcarlsson.se/assets/jonathansidwell.png"},
    //     {_id: "3",name: "Rachel Zane", isOnline: false, image: "http://emilcarlsson.se/assets/rachelzane.png"},
    //     {_id: "4",name: "Shoham Jacobsen",isOnline: false, image: "http://emilcarlsson.se/assets/mikeross.png"}
    // ];

    // @observable groups = [
    //     {_id: "1",name: "Group 1", image: "http://emilcarlsson.se/assets/harveyspecter.png"},
    //     {_id: "2",name: "Group 2", image: "http://emilcarlsson.se/assets/jonathansidwell.png"},
    //     {_id: "3",name: "Group 3", image: "http://emilcarlsson.se/assets/rachelzane.png"},
    //     {_id: "4",name: "Group 4", image: "http://emilcarlsson.se/assets/mikeross.png"}
    // ];

    // @observable messages = [
    //     {_id: "1", isLiked: true,      data: "Hey1" , from: "5d552f59d9e3ec02b84412e8", to: "1", type:"user", at: (new Date).toISOString()},
    //     {_id: "2", isLiked: undefined, data: "Hey2" , from: "1", to: "1", type:"group", at: (new Date).toISOString()},
    //     {_id: "3", isLiked: undefined, data: "Hey3" , from: "5d552f59d9e3ec02b84412e8", to: "1", type:"group", at: (new Date).toISOString()},
    //     {_id: "4", isLiked: undefined, data: "Not hey" , from: "3", to: "1", type:"user", at: (new Date).toISOString()},
    //     {_id: "5", isLiked: undefined, data: "Hello" , from: "2", to: "2", type:"group", at: (new Date).toISOString()},
    //     {_id: "6", isLiked: undefined, data: "Its me" , from: "2", to: "3", type:"group", at: (new Date).toISOString()},
    // ];

    @observable user = undefined;
    @observable users = [];
    @observable groups = [];
    @observable messages = [];
    @observable numberOfMessages = 20;
    @observable groupRequests = [];
    @observable joinRequests = [];
    @observable activeIndex = 0;
    @observable active = {type: "all", _id: "all messages"};
    @observable searchContacts = "";
    @observable searchMessages = "";
    @observable startDate = null;
    @observable endDate = null;
    @observable focusedInput = null;
    @observable registerLoading = false;
    @observable loading = true;
    @observable loadingUsers = true;
    @observable loadingGroups = true;
    @observable loadingMessages = true;
    @observable registerName = "";
    @observable registerImage = {};
    @observable errors = {};
    @observable textMessage = "";
    @observable imageMessage = {};
    @observable loadingGroupsRequests = false
    @observable loadingJoinRequests = false
    @observable showLater = true;
    @observable shouldScroll = false;

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
            return (
            (self.active.type == "all" && self.active._id == "all messages") 
            || (self.active.type == "all" && self.active._id == "everyone" && message.receiveType=="all") 
            || (message.receiveType=="group" && self.active.type == "group" && message.to == self.active._id)
            || (message.receiveType=="user" && self.active.type == "user" && ((message.from == self.active._id  && message.to == self.user._id)|| message.from == self.user._id && message.to == self.active._id))
            ) 
            && message.data.includes(self.searchMessages)
            && (self.startDate == null || self.startDate.isBefore(message.date))  
            && (self.endDate == null || self.endDate.isAfter(message.date))
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
        else if (this.active.type == "all"){
            if (this.active._id == "all messages")
                return {_id: "all messages",name: "All Messages", image: '/images/chat/avatars/system/all.png'}
            else if (this.active._id == "everyone")
                return {_id: "everyone",name: "Everyone", image: '/images/chat/avatars/system/everyone.png'}

        }
       
        return {};         
    }


    //***********Actions***********//
    @action 
    pullUser(silent=false){
        var self = this; 
        this.loading = true && !silent;
        fetch('/api/chat/user')
        .then(response => response.json())
        .then(user => {
            self.user = user;
            if(user)
                socket.emit('user connected', user._id)
        })
        .catch(self.user = undefined)
        .finally(() => self.loading = false)
    }
    @action 
    pullUsers(silent=false){
        var self = this;
        this.loadingUsers = true && !silent;
        fetch('/api/chat/getUsers')
        .then(response => response.json())
        .then(users => {
           self.users = users
        })
        .catch(self.users = [])
        .finally(() => self.loadingUsers = false)
    }
    
    @action 
    pullGroups(silent=false){
        var self = this;
        this.loadingGroups = true && !silent;
        fetch('/api/chat/getGroups')
        .then(response => response.json())
        .then(groups => {
            console.log(groups);
            self.groups = groups
        })
        .catch(self.groups = [])
        .finally(() => self.loadingGroups = false)
    }
    @action 
    pullMessages(silent=false){
        var self = this;
        this.loadingMessages = true && !silent;
        fetch('/api/chat/getMessages?amount=' + this.numberOfMessages)
        .then(response => response.json())
        .then(messages => {
           self.messages = messages;
           console.log("messages");
           console.log(messages);
        })
        .catch(err => {self.messages = []})
        .finally(() => self.loadingMessages = false)
    }
    @action 
    getLastMessage(type, id){
        var self = this;
        let filtered = this.messages.filter(function (message) {
            return (message.receiveType=="all" && type == "all") ||
            (message.receiveType=="group" && type == "group" && message.to == id) ||
            (message.receiveType=="user" && type == "user" && (message.from == id || message.from == self.user._id && message.to == id))
        });
        var last = filtered.slice(-1)[0];
        if(last)
            return {data:last.data, date:last.date};
        return {data:"", date:new Date(0).toUTCString()};
    }
    @action 
    pullGroupsRequests(silent=false){
        var self = this;
        this.loadingGroupsRequests = true && !silent;
        fetch('/api/chat/getGroupsRequests')
        .then(response => response.json())
        .then(groupRequests => {
           self.groupRequests = groupRequests
        })
        .catch(self.groupRequests = [])
        .finally(() => self.loadingGroupsRequests = false)
    }
    @action 
    pullJoinRequests(silent=false){
        var self = this;
        this.loadingJoinRequests = true && !silent;
        fetch('/api/chat/getJoinRequests')
        .then(response => response.json())
        .then(joinRequests => {
           self.joinRequests = joinRequests
        })
        .catch(self.joinRequests = [])
        .finally(() => self.loadingJoinRequests = false)
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
    @action
    submitRegisterForm(registerGroup=false){
        var self = this;
        this.registerLoading = true;
        this.errors = {};
        let data = {
            name: this.registerName,
            image: this.registerImage[0],
        }
        var form_data = new FormData();
        for ( var key in data ) {
            form_data.append(key, data[key]);
        }
        var url = '/api/chat/addUser';
        if (registerGroup)
            url = '/api/chat/addGroup';
        return fetch(url, {
            method: 'POST', 
            body: form_data, 
        })
        .catch(err => {return {general:"Server error: " + err}}) 
        .then(function(response) {
          if (response.status == 200){
            if(registerGroup)
                socket.emit('group request added');
            throw "Status is 200";
          }
          return response.json();
        })
    }
    @action
    updateUserConnection(id, isOnline){
        var index = store.users.findIndex(x => x._id == id);
        console.log(index);
        if(index != -1)
           this.users[index].isOnline = isOnline;
        else
            this.pullUsers(true);
        
    }
    @action
    sendTextMessage(){
        if (this.textMessage == undefined || this.textMessage == "")
            return;
        
        const message = {
            data: this.textMessage,
            dataType: "text",
            receiveType: this.active.type,
            from: this.user._id,
            to: (this.active.type == "all" ? undefined :  this.active._id),
            showLater: this.showLater,
        }
        socket.emit('send message', message);
        this.textMessage = "";
    }
    @action
    sendImageMessage(imagePath){
        if (imagePath == undefined || imagePath == "")
            return;
        const message = {
            data: imagePath,
            dataType: "image",
            receiveType: this.active.type,
            from: this.user._id,
            to: (this.active.type == "all" ? undefined :  this.active._id),
            showLater: true,
        }
        socket.emit('send message', message);
    }

    @action
    addMessage(message){
        this.messages.push(message)
    }

    @action
    disconnect(){
        socket.disconnect()
    }
    @action
    reconnect(){
        if (!socket.connected){
            socket = io(window.location.origin);
            initializeEvents()
        }
    }

    @action
    messageLiked(id){
           socket.emit('message liked', id)
    }
    @action
    messageUnliked(id){
           socket.emit('message unliked', id)
    }

    @action
    groupsChanged(){
        socket.emit('groups changed');
    }
    @action
    groupRequestsChanged(){
        socket.emit('group requests changed');
    }
    @action
    joinRequestsChanged(){
        socket.emit('join requests changed');
    }
    @action
    joinRequestsAccepted({userId,groupId}){
        socket.emit('join requests changed');
        socket.emit('join requests accepted', {userId,groupId});
    }
    

    @action
    updateMessageLikes(id, likes, unlikes){
        var index = this.messages.findIndex(x => x._id == id);
            if(index != -1){
                this.messages[index].likes = likes;
                this.messages[index].unlikes = unlikes;
            }
    }

    @action
    groupJoined(gorupId){
        var index = this.groups.findIndex(x => x._id == gorupId);
            if(index != -1){
                this.groups[index].isMember = true;
            }
    }

}
var store = new chatStore;

function initializeEvents(){
    socket.on('user connection changed', function(data){
        console.log(data);
        store.updateUserConnection(data.id, data.isOnline)
    })
    socket.on('message likes changed', function(data){
        store.updateMessageLikes(data.id, data.likes, data.unlikes)
    })
    socket.on('new message', function(message){
        store.shouldScroll = true;
        store.addMessage(message)
    })
    
    socket.on('reload group requests', function(){
        store.pullGroupsRequests();
    })
    
    socket.on('reload join requests', function(){
        store.pullJoinRequests();
    })
    
    socket.on('reload groups', function(){
        store.pullGroups(true);
    })
    socket.on('group joined', function(groupId){
        store.groupJoined(groupId);
    })
    
}
initializeEvents();


export default store;
autorun(() => {console.log(store.active._id)})
