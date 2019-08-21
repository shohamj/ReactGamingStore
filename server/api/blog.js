import express from 'express';
// import Blog from '../models/blog.js';

let router = express.Router();  

router.get('/blog/:id', (req,res) => {
        const test = {_id:1, author: "Shoham", image:"/images/blog/blog-04.jpg", date: Date.now(), title:"8 Interesting Facts About Shaving Unwilling Cats", categories:["Cats"], text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."};
        res.json(test);
    // Blog.findById(req.params.id, function(err, blog) {
    //     if(blog)
    //         res.json(blog);  
    //     else
    //         res.json({})
    // });

})

export default router;