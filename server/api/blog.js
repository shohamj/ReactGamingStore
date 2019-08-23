import express from 'express';
import Post from '../models/post.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import postValidator from '../../shared/validation/postValidator.js';

let router = express.Router();  
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let path = `./public/images/blog/`;
        if (!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
        cb(null, path);
      },
    filename: function(req,file,cb){
        cb(null, req.body.author + "-" + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({
    storage: storage
}).single('image');


router.get('/getPost/:id', (req,res) => {
    if (req.user == undefined)
        return res.status(500).send("Unauthorized");
    Post.findById(req.params.id, function(err, blog) {
        if(blog)
            res.json(blog);  
        else
            res.json({})
    });

})

router.get('/postsList', function(req, res) {
    if (req.user == undefined)
        return res.status(500).send("Unauthorized");
    Post.find({}, function(err, posts) {
      res.send(posts);  
    });
});

router.post('/addPost', (req,res) => {
    if (req.user == undefined)
        return res.status(500).send("Unauthorized");
    upload(req,res,(err) =>{
        let data = {...req.body};
        data.categories = JSON.parse(data.categories);
        const {errors, isValid} = postValidator(data, req.file);
        console.log({errors, isValid});
        if (!isValid)
            res.status(400).json(errors);
        else{
            if (err){
                console.log(err);
                res.status(400).json({image: "Error when saving image"});
            }
            else{
                data.image = req.file.filename;
                var post = new Post(data);
                post.save(function (err) {
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

export default router;