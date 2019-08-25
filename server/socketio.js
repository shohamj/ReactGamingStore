import socketIO from 'socket.io'
import ChatUser from './models/chatUser.js'
import ChatGroup from './models/chatGroup.js'
import ChatMessage from './models/chatMessage'

var socketToUser = {};
var userToSocket = {};

function listenSocket(server) {
    const io = socketIO(server);

    io.on("connection", (socket)=>{
        console.log("Socket.IO: connection");
        
        socket.on('disconnect', function(){
            console.log("Socket.IO: disconnect");
            ChatUser.findByIdAndUpdate(socketToUser[socket.id], {isOnline: false}, function(err){
                if (!err){
                    io.emit("user connection changed", {id: socketToUser[socket.id], isOnline: false});
                    delete userToSocket[socketToUser[socket.id]]
                    delete socketToUser[socket.id]
                }
            })
        })
        socket.on('new post', function(id){
            console.log("Socket.IO: new post");
            io.emit("reload posts");
        })
        socket.on('user created', function(id){
            console.log("Socket.IO: user created");
            io.emit("new user");
        })

        socket.on('user connected', function(id){
            console.log("Socket.IO: user connected");
            ChatGroup.find({}, function(err, groups){
                groups.forEach(function(group) {
                    if(group.members.some(u => u.toString() == id.toString()))
                        socket.join("group-" + group.name);
                });
            })
            ChatUser.findByIdAndUpdate(id, {isOnline: true}, function(err){
                if (!err){
                    userToSocket[id] = socket.id;
                    socketToUser[socket.id] = id;
                    io.emit("user connection changed", {id, isOnline: true});
                }
            })
        })

        socket.on('send message', function(message){
            console.log("Socket.IO: send message");
            var chatMessage= new ChatMessage(message);
            chatMessage.save(function (err,msg) {
                console.log(err);
                if (!err){
                    console.log(msg.data);
                    if (message.receiveType == 'all')
                        if (msg.showLater)
                            ChatUser.updateMany({}, { $push: { messages: {id:msg._id} } },function(err){
                                    if (!err)
                                        io.emit("new message", msg);
                                    else
                                        console.log(err);
                            });
                        else
                            ChatUser.updateMany({isOnline: true}, { $push: { messages: {id:msg._id} } },function(err){
                                if (!err)
                                    io.emit("new message", msg);
                                else
                                    console.log(err);
                            });
                    else if (message.receiveType == 'user'){
                        ChatUser.findByIdAndUpdate(message.from, { $push: { messages: {id:msg._id} } },
                            function(err){
                                if (!err){
                                    io.to(userToSocket[message.from]).emit("new message", msg);
                            }
                        })
                        ChatUser.findByIdAndUpdate(message.to, { $push: { messages: {id:msg._id} } },
                            function(err){
                                if (!err){
                                    io.to(userToSocket[message.to]).emit("new message", msg);
                            }
                        })
                    }
                    else if (message.receiveType == 'group'){
                        console.log(msg);
                        ChatGroup.findById(message.to, function(err, group){
                            if (msg.showLater)
                                ChatUser.updateMany({'_id': { $in: group.members}}, { $push: { messages: {id:msg._id} } },
                                    function(err, members){
                                        console.log(members);
                                        if (!err)
                                            io.to("group-" + group.name).emit("new message", msg);
                                        else
                                            console.log(err);
                                })
                            else
                                ChatUser.updateMany({'_id': { $in: group.members}, isOnline: true}, { $push: { messages: {id:msg._id} } },
                                    function(err, members){
                                        console.log(members);
                                        if (!err)
                                            io.to("group-" + group.name).emit("new message", msg);
                                        else
                                            console.log(err);
                                })
                        });
                    };
                }; 
            })
        });

        socket.on('message liked', function(message_id){
            console.log("Socket.IO: message liked");
            ChatUser.findById(socketToUser[socket.id],  function(err, user){
                if (!err && user){
                    var index = user.messages.findIndex(msg => msg.id == message_id);
                    if (user.messages[index].isLiked == true)
                        return;
                    const wasUnlike = user.messages[index].isLiked == false;
                    user.messages[index].isLiked = true;
                    user.markModified('messages');
                    user.save(() => {
                        ChatMessage.findById(message_id, function(err, message){
                            message.likes += 1;
                            console.log(message);
                            if (wasUnlike)
                                message.unlikes -= 1;
                            if (message.receiveType == 'user'){
                                io.to(userToSocket[message.from]).emit("message likes changed", {id: message_id, likes: message.likes, unlikes:  message.unlikes});
                                io.to(userToSocket[message.to]).emit("message likes changed", {id: message_id, likes: message.likes, unlikes:  message.unlikes});
                            }
                            else if (message.receiveType == 'group')
                                ChatGroup.findById(message.to, function(err, group){
                                    console.log(group);
                                    io.to("group-" + group.name).emit("message likes changed", {id: message_id, likes: message.likes, unlikes:  message.unlikes});
                                })
                            else if (message.receiveType == 'all'){
                                io.emit("message likes changed", {id: message_id, likes: message.likes, unlikes:  message.unlikes});
                            }

                            message.save()     
                        })
                    })
                }
            })
        })

        socket.on('message unliked', function(message_id){
            console.log("Socket.IO: message unliked");
            ChatUser.findById(socketToUser[socket.id],  function(err, user){
                if (!err && user){
                    var index = user.messages.findIndex(msg => msg.id == message_id);
                    if (user.messages[index].isLiked == false)
                        return;
                    const wasLike = user.messages[index].isLiked == true;
                    user.messages[index].isLiked = false;
                    user.markModified('messages');
                    user.save(() => {
                        ChatMessage.findById(message_id, function(err, message){
                            message.unlikes += 1;
                            if (wasLike)
                                message.likes -= 1;
                            if (message.receiveType == 'user'){
                                io.to(userToSocket[message.from]).emit("message likes changed", {id: message_id, likes: message.likes, unlikes:  message.unlikes});
                                io.to(userToSocket[message.to]).emit("message likes changed", {id: message_id, likes: message.likes, unlikes:  message.unlikes});
                            }
                            else if (message.receiveType == 'group')
                                ChatGroup.findById(message.to, function(err, group){
                                    io.to("group-" + group.name).emit("message likes changed", {id: message_id, likes: message.likes, unlikes:  message.unlikes});
                                })
                            else if (message.receiveType == 'all'){
                                io.emit("message likes changed", {id: message_id, likes: message.likes, unlikes:  message.unlikes});
                            }
                            message.save()     
                        })
                    })
                }
            })
        })

        socket.on('groups changed', function(id){
            console.log("Socket.IO: groups changed");
            io.emit("reload groups");
        })

        socket.on('group requests changed', function(){
            console.log("Socket.IO: group requests changed");
            io.emit("reload group requests");
        })

        socket.on('join requests changed', function(){
            console.log("Socket.IO: join requests changed");
            io.emit("reload join requests");
        })
        
        socket.on('join requests accepted', function({userId,groupId}){
            console.log("Socket.IO: join requests accepted");
            ChatGroup.findById(groupId, function(err, group){
                    if(!err){
                        io.sockets.connected[userToSocket[userId]].join("group-" + group.name);
                        io.to(userToSocket[userId]).emit("group joined", groupId);
                    }
            });
        })

    })
    return io
}


export default listenSocket;
