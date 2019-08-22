import express from 'express';
import Game from '../models/game.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import gameValidator from '../../shared/validation/gameValidator.js';
import userMiddleware from '../middlewares/userMiddleware'

let router = express.Router();  

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let name = req.body.name;
        let path = `./public/images/games/${name}`;
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
        cb(null, path);
      },
    filename: function(req,file,cb){
        cb(null, "image-" + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({
    storage: storage
}).single('image');

router.get('/game/:id',userMiddleware(), (req,res) => {
    if (req.userError)
        return res.status(401).send(req.userError)
    Game.findById(req.params.id, function(err, game) {
        if(game)
            res.json(game);  
        else
            res.json({_id:req.params.id, name:"Not Found", price:"0", mainImage:"enslaved/main.png", extraImages:["enslaved/main.png", "enslaved/1.png"], desc:"This is a place holder for now"})
    });

})

router.post('/addGame',userMiddleware(['manager', 'employee']), (req,res) => {
    if (req.userError)
        return res.status(401).send(req.userError)
    upload(req,res,(err) =>{
        let data = {...req.body};
        data.genre = JSON.parse(data.genre);
        data.platform = JSON.parse(data.platform);
        data.price = parseFloat(data.price);
        const {errors, isValid} = gameValidator(data, req.file);
        console.log({errors, isValid});
        if (!isValid)
            res.status(400).json(errors);
        else{
            if (err){
                res.status(400).json({image: "Error when saving image"});
            }
            else{
                data.mainImage = data.name + "/" + req.file.filename;
                var game = new Game(data);
                game.save(function (err) {
                    if (err) {
                        res.status(400).json({image: "Error when saving game"});
                        console.log(err)
                    }
                    else
                        res.send("Hurray")
                });   
            }
        }
        
    })
    
})
router.post('/deleteGame',userMiddleware(['manager', 'employee']), (req,res) => {
    if (req.userError)
        return res.status(401).send(req.userError)
    Game.remove({ _id: req.body.id }, function(err) {
        if (!err) {
            res.send("error");
        }
        else {
            res.send("success");
        }
    });
})

router.post('/addCart',userMiddleware(), function(req, res) {
    if (req.userError)
        return res.status(401).send(req.userError)
    let game = {
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        amount: req.body.amount,
        price: req.body.price
    }
    if (req.session.cart == undefined)
        req.session.cart = []
    let index = req.session.cart.findIndex(item => item.id == game.id);
    if (index > -1){
        if (req.body.amount > 0)
            req.session.cart[index].amount += game.amount;
        else    
            if (req.session.cart[index].amount > 1)
                req.session.cart[index].amount -= 1;
    }

    else 
        req.session.cart.push(game)
    res.send("Done");
});

router.post('/removeCart',userMiddleware(), function(req, res) {
    if (req.userError)
        return res.status(401).send(req.userError)
    if (req.session.cart == undefined)
        req.session.cart = []
    let index = req.session.cart.findIndex(item => item.id == req.body.id);
    if (index > -1)
        req.session.cart.splice(index,1)

    res.send("Removed");
});

router.get('/getCart',userMiddleware(), function(req, res) {
    if (req.userError)
        return res.status(401).send(req.userError)
    console.log(req.session.cart);
    if (req.session.cart == undefined)
        req.session.cart = []
    res.send(req.session.cart);
});

router.get('/clearCart',userMiddleware(), function(req, res) {
    if (req.userError)
        return res.status(401).send(req.userError)
    req.session.cart = []
    res.send(req.session.cart);
});
  
router.get('/gamesList',userMiddleware(), function(req, res) {
    if (req.userError)
        return res.status(401).send(req.userError)
    console.log(req.user);
    Game.find({}, function(err, games) {
      res.send(games);  
    });
  });

router.get('/topGamesList', function(req, res) {
   
    Game.find().sort({sold: -1}).limit(3)
    .then(function(games, err) {
        console.log(games);
        console.log('----------------------');
        console.log(games[0]);
        res.send(games);  
    });
});


export default router;