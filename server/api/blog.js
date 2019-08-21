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
    // const test = {_id:1, author: "Shoham", image:"/images/blog/blog-04.jpg", date: Date.now(), title:"8 Interesting Facts About Shaving Unwilling Cats", categories:["Cats"], text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."};
    // res.json(test);
    Post.findById(req.params.id, function(err, blog) {
        if(blog)
            res.json(blog);  
        else
            res.json({})
    });

})

router.get('/postsList', function(req, res) {
    Post.find({}, function(err, posts) {
      res.send(posts);  
    });
});

router.get('/getPost/:id', (req,res) => {
        // const test = {_id:1, author: "Shoham", image:"/images/blog/blog-04.jpg", date: Date.now(), title:"8 Interesting Facts About Shaving Unwilling Cats", categories:["Cats"], text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."};
        // res.json(test);
    Blog.findById(req.params.id, function(err, blog) {
        if(blog)
            res.json(blog);  
        else
            res.json({})
    });

})

router.post('/addPost', (req,res) => {
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