import express from 'express';
import Game from '../models/game.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import gameValidator from '../../shared/validation/gameValidator.js';

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

router.get('/game/:id', (req,res) => {
    // setTimeout(() =>  
    //     res.json({id:req.params.id, name:"Name1", price:"13.99", images:["enslaved/main.png", "enslaved/1.png"], desc:"Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat."}),
    //     3000
    // )
    Game.findById(req.params.id, function(err, user) {
        if(user)
            res.json(user);  
        else
            res.json({_id:req.params.id, name:"Not Found", price:"0", mainImage:"enslaved/main.png", extraImages:["enslaved/main.png", "enslaved/1.png"], desc:"This is a place holder for now"})
    });

})

router.post('/addGame', (req,res) => {
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
router.post('/deleteGame', (req,res) => {
    Game.remove({ _id: req.body.id }, function(err) {
        if (!err) {
            res.send("error");
        }
        else {
            res.send("success");
        }
    });
})

router.post('/addCart', function(req, res) {
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

router.post('/removeCart', function(req, res) {
    if (req.session.cart == undefined)
        req.session.cart = []
    let index = req.session.cart.findIndex(item => item.id == req.body.id);
    if (index > -1)
        req.session.cart.splice(index,1)

    res.send("Removed");
});

router.get('/getCart', function(req, res) {
    console.log(req.session.cart);
    if (req.session.cart == undefined)
        req.session.cart = []
    res.send(req.session.cart);
});

router.get('/clearCart', function(req, res) {
    req.session.cart = []
    res.send(req.session.cart);
});
  
router.get('/gamesList', function(req, res) {
    Game.find({}, function(err, games) {
      res.send(games);  
    });
  });


export default router;