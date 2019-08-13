import express from 'express';
import Order from '../models/order.js';
import Game from '../models/game.js';
import User from '../models/user.js';

let router = express.Router();  

router.get('/addOrder', (req,res) => {
    if (req.user == undefined || req.session.cart == undefined || req.session.cart.length < 1)
        res.send("Empty Cart");
    else {
        var orders = req.session.cart.map(function(game){
            return {
                userID: req.user._id,
                gameID: game.id, 
                user: req.user.username,
                game: game.name,
                price: game.price,
                amount: game.amount,
                total: game.price * game.amount,
                status: "Pending"
            }
        });
        Order.insertMany(orders, function(error, docs) {
            if(error)
                res.send(error);
            else
                res.send(docs);
        })
    }
})  

router.post('/cancelOrder', (req,res) => {
    Order.findOneAndUpdate({_id: req.body.id}, {status:"Canceled"}, function(err) {
        res.send("Canceled");  
    });
})  

router.post('/acceptOrder', (req,res) => {
    Order.findOneAndUpdate({_id: req.body.id}, {status:"Accepted"}, function(err, order) {
        Game.findOneAndUpdate({_id: order.gameID}, {$inc: {sold: order.amount}}, function(err) {
            User.findOneAndUpdate({_id: order.userID}, {$inc: {games_bought: order.amount, money_spent: order.total}}, function(err) {
                res.send("Accepted");  
            }); 
        }); 
    });
}) 

router.get('/ordersList', function(req, res) {
    if (req.user.role == "customer"){
        Order.find({userID: req.user._id}, function(err, users) {
            res.send(users);  
        });
    }
    else
        if (req.user.role == "manager" || req.user.role == "employee"){
            Order.find({}, function(err, users) {
                res.send(users);  
            });
        }
        else
            res.send([]);  
  });


export default router;