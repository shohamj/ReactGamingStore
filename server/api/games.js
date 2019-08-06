import express from 'express';
let router = express.Router();  

router.get('/game/:id', (req,res) => {
    setTimeout(() =>  
        res.json({id:req.params.id, name:"Name1", price:"13.99", images:["enslaved/main.png", "enslaved/1.png"], desc:"Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris consequat ornare feugiat."}),
        3000
    )
})

export default router;