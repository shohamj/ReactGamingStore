import express from 'express';
import ChatUser from '../models/chatUser.js';
import ChatGroup from '../models/chatGroup.js';
import ChatMessage from '../models/chatMessage.js';
import CreateChatGroupRequest from '../models/createChatGroupRequest';
import JoinGroupRequest from '../models/joinGroupRequest';
import chatUserValidator from '../../shared/validation/chatUserValidator.js';

import multer from 'multer';
import path from 'path';
import fs from 'fs';

let router = express.Router();  

const storage = multer.diskStorage({
    destination: './public/images/chat/avatars',
    filename: function(req,file,cb){
        cb(null, req.body.name + "-" + req.user._id + path.extname(file.originalname))
    }
});
const upload = multer({
    storage: storage
}).single('image');

router.get('/user', (req,res) => {
    if (req.user == undefined)
        res.status(500).send("Unauthorized");
    else
        ChatUser.findOne({userID: req.user._id}, function (err, user) {
            res.json(user);
        });
})

router.get('/getUsers', (req,res) => {
    if (req.user == undefined)
        res.status(500).send("Unauthorized");
    else
    ChatUser.findOne({userID: req.user._id}, function (err, user) {
        if (!user)
            return res.status(403).send("Unauthorized");
        ChatUser.find({}, function (err, users) {
            res.json(users);
        });
    })    
})
router.get('/getGroups', (req,res) => {
    if (req.user == undefined)
        res.status(500).send("Unauthorized");
    else
        ChatGroup.find({}, function (err, groups) {
            ChatUser.findOne({userID: req.user._id}, function (err, user) {
                if (!user)
                    return res.status(403).send("Unauthorized");
                var userGroups = groups.map(function(group){
                    let grp = Object.assign(group, {isMember: group.members.some(u => u.toString() == user._id.toString())})
                    delete group["members"]
                    return grp;
                })
                res.json(userGroups);
            }).lean();;
        }).lean();
})
router.get('/getGroupsRequests', (req,res) => {
    if (req.user == undefined)
        res.status(500).send("Unauthorized");
    ChatUser.findOne({userID: req.user._id}, function (err, user) {
        if (!user)
            return res.status(403).send("Unauthorized");
        if (req.user.role == "customer" || req.user.role == "employee"){
            CreateChatGroupRequest.find({status: "Pending", managerId: user._id}, function (err, requests) {
                res.json(requests);
            });
        }
        else
            if (req.user.role == "manager"){
                CreateChatGroupRequest.find({status: "Pending"}, function (err, requests) {
                    res.json(requests);
                });;
            }
            else
                res.send([]);  
    });            
})

router.get('/getJoinRequests', (req,res) => {
    if (req.user == undefined)
        res.status(500).send("Unauthorized");
    ChatUser.findOne({userID: req.user._id}, function (err, user) {
        if (!user)
            return res.status(403).send("Unauthorized");
        if (req.user.role == "customer" || req.user.role == "employee"){
            ChatGroup.find({manager: user._id}, function(err, groupsIDs){
                console.log(groupsIDs);
                JoinGroupRequest.find({status: "Pending", groupId: { $in: groupsIDs}}, function (err, requests) {
                    res.json(requests);
                });
            }).select('_id')
        }
        else
            if (req.user.role == "manager"){
                JoinGroupRequest.find({status: "Pending"}, function (err, requests) {
                    res.json(requests);
                });;
            }
            else
                res.send([]);  
    });            
})

router.get('/getMessages', (req,res) => {
    if (req.user == undefined)
        res.status(500).send("Unauthorized");
    else{
        ChatUser.findOne({userID: req.user._id}, function(err, user){
            if (!user)
                return res.status(403).send("Unauthorized");
            if (!err){
                const ids = user.messages.map(msg => msg.id);
                ChatMessage.find({'_id': { $in: ids}} , function (err, messages) {
                    const messageWithLiked = messages.map((msg, index) => {
                        return Object.assign(msg, {isLiked: user.messages[index].isLiked})
                    });
                    var amount = parseInt(req.query.amount);
                    var lastXMessagesWithLiked = messageWithLiked.slice(1).slice(-amount)
                    res.json(lastXMessagesWithLiked);
                }).lean();
            }  
            else
                res.json({});
        });
    }
})

router.get('/getOverallReaction', (req,res) => {
    if (req.user == undefined)
        res.status(500).send("Unauthorized");
    else{
        ChatUser.findOne({userID: req.user._id}, function(err, user){
            if (!user)
                return res.status(403).send("Unauthorized");
            if (!err){
                const ids = user.messages.map(msg => msg.id);
                ChatMessage.find({'_id': { $in: ids}} , function (err, messages) {
                    let likes = 0;
                    let unlikes = 0;
                    messages.forEach(function(message) {
                        if (user._id.equals(message.from)){
                            likes += message.likes;
                            unlikes += message.unlikes;
                        }
                    });
                    return res.json({likes, unlikes});
                })
            }  
            else
                res.json({likes:-1, unlikes:-1});
        });
    }
})


router.post('/addUser', (req,res) => {
    if (req.user == undefined)
        res.status(500).send("Unauthorized");
    upload(req,res,(err) =>{
        let name = req.body.name;
        const {errors, isValid} = chatUserValidator(name, req.file);
        if (!isValid)
            res.status(400).json(errors);
        else{
            if (err){
                res.status(400).json({image: "Error when saving image"});
            }
            else{
                let data = {name: req.body.name, image: "/images/chat/avatars/" + req.file.filename, userID: req.user._id}
                var chatUser = new ChatUser(data);
                chatUser.save(function (err) {
                    if (err) {
                        res.status(400).json({image: "Error when saving user"});
                        console.log(err)
                    }
                    else
                        res.send("Hurray")
                });   
            }
        }    
    }) 
}) 
router.post('/addGroup', (req,res) => {
    if (req.user == undefined)
        res.status(500).send("Unauthorized");
    upload(req,res,(err) =>{
        let name = req.body.name;
        const {errors, isValid} = chatUserValidator(name, req.file);
        if (!isValid)
            res.status(400).json(errors);
        else{
            if (err){
                res.status(400).json({image: "Error when saving image"});
            }
            else{
                ChatUser.findOne({userID: req.user._id}, function (err, user) {
                    if (!user)
                        return res.status(403).send("Unauthorized");
                    let data = {
                        name: req.body.name, 
                        image: "/images/chat/avatars/" + req.file.filename,
                        managerId: user._id,
                        managerName: user.name,
                        managerUsername: req.user.username
                    }
                    var request = new CreateChatGroupRequest(data);
                    request.save(function (err) {
                        if (err) {
                            res.status(400).json({image: "Error when creating request"});
                            console.log(err)
                        }
                        else
                            res.send("Request")
                    });   
                });     
            }
        }    
    }) 
}) 

router.post('/addMessage', (req,res) => {
    if (req.user == undefined)
        res.status(500).send("Unauthorized");
    ChatUser.findOne({userID: req.user._id}, function (err, user) {
        if (!user)
            return res.status(403).send("Unauthorized");
        let data = {
            data: req.body.data, 
            dataType: req.body.dataType,
            receiveType: req.body.receiveType,
            from: req.body.from,
            to: req.body.to
        }
        var chatMessage= new ChatMessage(data);
        chatMessage.save(function (err) {
            if (err) {
                console.log(err)
            }
            res.send("Message added")
        }); 
    });  
})

router.post('/cancelGroupRequest', (req,res) => {
    if( req.user == undefined || req.user.role != "manager")
        return res.status(401).send("Unauthorized");  
    CreateChatGroupRequest.findOneAndUpdate({_id: req.body.id}, {status:"Canceled"}, function(err) {
        res.send("Canceled");  
    });
})  

router.post('/acceptGroupRequest', (req,res) => {
    if( req.user == undefined || req.user.role != "manager")
        return res.status(401).send("Unauthorized");  
    CreateChatGroupRequest.findOneAndUpdate({_id: req.body.id}, {status:"Accepted"}, function(err, request) {
        var newGroup = new ChatGroup({name: request.name, image: request.image, manager: request.managerId, members:[request.managerId]});
        newGroup.save(function(err){
            res.send("Accepted");  
        })
    });
}) 

router.post('/cancelJoinRequest', (req,res) => {  
    if (req.user == undefined)
        res.status(500).send("Unauthorized");
    JoinGroupRequest.findOne({_id: req.body.id}, function(err, request) {
        ChatUser.findOne({userID: req.user._id}, function (err, user) {
            if (!user && (req.user == undefined || req.user.role != "manager"))
                return res.status(403).send("Unauthorized");
            ChatGroup.findOne({_id:request.groupId}, function(err, group){
                if( req.user == undefined  ||  (req.user.role != "manager" && !group.manager.equals(user._id)))
                    return res.status(401).send("Unauthorized");
                    if (!err){
                        request.status="Canceled";
                        request.save(function(){
                            res.send("Canceled"); 
                        })    
                    }
                    else
                        res.send("Error"); 
            })  
        })
    })
});

router.post('/acceptJoinRequest', (req,res) => {
    if (req.user == undefined)
        res.status(500).send("Unauthorized");  
    JoinGroupRequest.findOne({_id: req.body.id}, function(err, request) {
        ChatUser.findOne({userID: req.user._id}, function (err, user) {
            if (!user && (req.user == undefined || req.user.role != "manager"))
                return res.status(403).send("Unauthorized");
            ChatGroup.findOne({_id:request.groupId}, function(err, group){
                if( req.user == undefined  ||  (req.user.role != "manager" && !group.manager.equals(user._id)))
                    return res.status(401).send("Unauthorized");
                if (!err){
                    group.members.push(request.userId);
                    request.status="Accepted";
                    group.save(function(){
                        request.save(function(){
                            res.json({userId:request.userId, groupId:request.groupId}); 
                        })
                    })    
                }
                else
                    res.send("Error"); 
            }) 
        })
    })
});

router.post('/requestJoin', (req,res) => {
    if (req.user == undefined)
        res.status(500).send("Unauthorized");
    else
        ChatUser.findOne({userID: req.user._id}, function (err, user) {
            if (!user)
                return res.status(403).send("Unauthorized");
            ChatGroup.findById(req.body.id, function (err, group) {
                if (!group)
                    return res.send("Error");
                JoinGroupRequest.findOne({groupId: group._id,userId: user._id, status:"Pending"}, function (err, result) {
                    if (!result) {
                        const data = {
                            groupName: group.name,
                            groupId: group._id,
                            userImage: user.image,
                            userName: user.name,
                            userId: user._id,
                        }
                        var joinRequest = new JoinGroupRequest(data);
                        joinRequest.save(function(err,request){
                            if (!err) {
                                res.send("Requested");
                            }
                            else{
                                res.send("Error");
                            }
                        })
                    }
                    else
                        res.send("Already Requested");
                })       
            });
        });

})
const chatImagesStorage = multer.diskStorage({
    destination: './public/images/chat/messages',
    filename: function(req,file,cb){
        cb(null, "chat_image_" + req.user._id + '_'  + Date.now() + path.extname(file.originalname))
    }
});
const chatImagesUpload = multer({
    storage: chatImagesStorage
}).single('image');

router.post('/uploadImage', (req,res) => {
    if( req.user == undefined)
        return res.status(401).send("Unauthorized");  
        chatImagesUpload(req,res,(err) =>{
            res.send("/images/chat/messages/" + req.file.filename)
        });

})  
export default router;