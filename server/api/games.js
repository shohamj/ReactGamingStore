import express from 'express';
import Game from '../models/game.js'
let router = express.Router();  

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

router.get('/addGame', (req,res) => {
    var game = new Game({name:"Enslaved", price:"13.99", platform: ["PC", "Linux"],released:new Date(),controller:true,mainImage:"enslaved/main.png", extraImages:["enslaved/1.png"], description:"Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat."});
    game.save(function (err) {
        if (err) console.log(err);
        res.send("Hurray")
    });    
})

router.get('/gamesList', function(req, res) {
    Game.find({}, function(err, games) {
      res.send(games);  
    });
  });


export default router;