import express from 'express';
import Order from '../models/order.js';
import Game from '../models/game.js';
import User from '../models/user.js';
import nodemailer from 'nodemailer';
import {outputKeysGenerate} from '../mailTemplate/emailTemplate'
import userMiddleware from '../middlewares/userMiddleware'

let router = express.Router();  

router.get('/addOrder',userMiddleware(), (req,res) => {
    if (req.userError)
        return res.status(401).send(req.userError);
    if (req.session.cart == undefined || req.session.cart.length < 1)
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

router.post('/cancelOrder',userMiddleware(['manager','employee']), (req,res) => {
    if (req.userError)
        return res.status(401).send(req.userError);
    Order.findOneAndUpdate({_id: req.body.id}, {status:"Canceled"}, function(err, order) {
        Game.findOne({_id: order.gameID}, function(err, game) {
            User.findOne({_id: order.userID}, function(err, user) {
                res.send({email:user.email});  
            }); 
        }); 
    });
})  

router.post('/acceptOrder',userMiddleware(['manager','employee']), (req,res) => {
    if (req.userError)
        return res.status(401).send(req.userError);
    Order.findOneAndUpdate({_id: req.body.id}, {status:"Accepted"}, function(err, order) {
        Game.findOneAndUpdate({_id: order.gameID}, {$inc: {sold: order.amount}}, function(err) {
            User.findOneAndUpdate({_id: order.userID}, {$inc: {games_bought: order.amount, money_spent: order.total}}, function(err, user) {
                res.send({email:user.email});  
            }); 
        }); 
    });
}) 
router.post('/sendOrderStatus', (req,res) => {
    console.log('im here how nice');
    console.log(req.body);

    var userName = req.body.user;
    var amount = req.body.amount;
    var game = req.body.game;
    var price = req.body.price;
    var total = req.body.total;
    var status = req.body.status;
    var email = req.body.email;

    console.log("hello my namer is garen", userName,game, status, email);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      port: 25,
      auth: {
        user: 'React2019JCT@gmail.com',
        pass: 'React2019JCT'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    var mailOptionsToCompany = {
      from: 'React2019JCT@gmail.com',
      to: email,
      subject: 'React Order',
      text: "Your Order has been " + status,
      html: outputKeysGenerate(userName,amount,game,price,total,status)
    };

    transporter.sendMail(mailOptionsToCompany, function(err,info)
    {
      if(err)
      {
        console.log("error", err);
        res.send("error");
      }else{     
            console.log('Email sent' + info.response); 
            res.send("success"); 
        }
      });
})

router.get('/ordersList',userMiddleware(), function(req, res) {
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