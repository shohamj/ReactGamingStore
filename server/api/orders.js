import express from 'express';
import Order from '../models/order.js';

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

router.get('/ordersList', function(req, res) {
    Order.find({}, function(err, users) {
      res.send(users);  
    });
  });


export default router;